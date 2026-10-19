import {
  apiErrorSchema,
  cardSchema,
  healthSchema,
  metaSchema,
  rankingResponseSchema,
  scoreResultSchema,
} from '@cardinal/shared'
import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { metaFixture, rankingFixture, scenarios, scoreFixture } from '../helpers/fixtures.ts'
import { createTestApp } from '../helpers/test-app.ts'

const { app } = createTestApp()

function erroDe(body: unknown) {
  return apiErrorSchema.parse(body).error
}

describe('GET /api/health e /api/meta', () => {
  it('health responde ok', async () => {
    const response = await request(app).get('/api/health').expect(200)
    expect(healthSchema.parse(response.body).status).toBe('ok')
  })

  it('meta traz as contagens da base', async () => {
    const response = await request(app).get('/api/meta').expect(200)
    expect(metaSchema.parse(response.body)).toEqual({
      totalCards: metaFixture.totalCards,
      spendOnlyCards: metaFixture.spendOnlyCards,
      investmentRouteCards: metaFixture.totalCards - metaFixture.spendOnlyCards,
    })
  })
})

describe('GET /api/cards/:id', () => {
  it('devolve o cartão completo, com fontes', async () => {
    const response = await request(app).get('/api/cards/nucr').expect(200)
    const card = cardSchema.parse(response.body)
    expect(card.name).toBe('Nubank Croma')
    expect(card.sources?.length).toBeGreaterThan(0)
  })

  it('cartões originais, sem fontes cadastradas, não trazem a chave sources', async () => {
    const response = await request(app).get('/api/cards/nuv').expect(200)
    expect(cardSchema.parse(response.body).name).toBe('Nubank Ultravioleta')
    expect('sources' in response.body).toBe(false)
  })

  it('404 com corpo de erro padronizado para id inexistente', async () => {
    const response = await request(app).get('/api/cards/nao-existe').expect(404)
    expect(erroDe(response.body).code).toBe('NOT_FOUND')
  })
})

describe('POST /api/ranking (paridade com o front antigo)', () => {
  it.each(rankingFixture.map((caso) => [caso.nome, caso] as const))('%s', async (_nome, caso) => {
    const response = await request(app)
      .post('/api/ranking')
      .send({ scenario: scenarios[caso.scenario], filters: caso.filters, sorting: caso.sorting })
      .expect(200)
    const body = rankingResponseSchema.parse(response.body)
    expect(body.items.map((item) => item.card.id)).toEqual(caso.ids)
    expect(body.total).toBe(caso.total)
    for (const item of body.items) expect(item.result).toEqual(scoreFixture[caso.scenario][item.card.id])
  })

  it('a lista não carrega as fontes (elas vêm no detalhe do cartão)', async () => {
    const response = await request(app)
      .post('/api/ranking')
      .send({ scenario: scenarios.padrao })
      .expect(200)
    expect(response.body.items.some((item: { card: object }) => 'sources' in item.card)).toBe(false)
  })

  it('sem filtros nem ordenação usa os padrões (todos os cartões, por nota)', async () => {
    const padrao = rankingFixture.find((caso) => caso.nome === 'padrao')!
    const response = await request(app).post('/api/ranking').send({ scenario: scenarios.padrao }).expect(200)
    expect(response.body.items.map((item: { card: { id: string } }) => item.card.id)).toEqual(padrao.ids)
  })

  it('hiddenSpendOnlyCount aparece quando os só por gasto estão ocultos', async () => {
    const response = await request(app)
      .post('/api/ranking')
      .send({
        scenario: scenarios.padrao,
        filters: { group: 'all', feeStatus: 'all', loungeOnly: false, searchText: '', includeSpendOnly: false },
      })
      .expect(200)
    expect(response.body.hiddenSpendOnlyCount).toBe(metaFixture.spendOnlyCards)
  })
})

describe('POST /api/ranking: validação da entrada', () => {
  const valido = { scenario: scenarios.padrao }

  it.each([
    ['sem cenário', {}, 'scenario'],
    ['aporte negativo', { scenario: { ...scenarios.padrao, investment: -1 } }, 'scenario.investment'],
    ['aporte acima do limite', { scenario: { ...scenarios.padrao, investment: 1e12 } }, 'scenario.investment'],
    ['gasto não numérico', { scenario: { ...scenarios.padrao, monthlySpend: 'muito' } }, 'scenario.monthlySpend'],
    ['peso fora da faixa', { scenario: { ...scenarios.padrao, weights: { ...scenarios.padrao.weights, rewards: 101 } } }, 'scenario.weights.rewards'],
    ['grupo desconhecido', { ...valido, filters: { group: 'cripto', feeStatus: 'all', loungeOnly: false, searchText: '', includeSpendOnly: true } }, 'filters.group'],
    ['busca longa demais', { ...valido, filters: { group: 'all', feeStatus: 'all', loungeOnly: false, searchText: 'x'.repeat(81), includeSpendOnly: true } }, 'filters.searchText'],
    ['ordenação desconhecida', { ...valido, sorting: { key: 'cor', direction: 'asc' } }, 'sorting.key'],
  ])('400 para %s', async (_nome, corpo, caminho) => {
    const response = await request(app).post('/api/ranking').send(corpo).expect(400)
    const erro = erroDe(response.body)
    expect(erro.code).toBe('VALIDATION_ERROR')
    expect((erro.details as { path: string }[]).map((detalhe) => detalhe.path)).toContain(caminho)
  })

  it('400 INVALID_JSON para JSON malformado', async () => {
    const response = await request(app)
      .post('/api/ranking')
      .set('Content-Type', 'application/json')
      .send('{"scenario": ')
      .expect(400)
    expect(erroDe(response.body).code).toBe('INVALID_JSON')
  })

  it('413 para corpo acima de 100 kb', async () => {
    const response = await request(app)
      .post('/api/ranking')
      .send({ ...valido, lixo: 'x'.repeat(150_000) })
      .expect(413)
    expect(erroDe(response.body).code).toBe('PAYLOAD_TOO_LARGE')
  })
})

describe('POST /api/cards/:id/score', () => {
  it('devolve a nota do cartão no cenário informado', async () => {
    const response = await request(app)
      .post('/api/cards/nuv/score')
      .send({ scenario: scenarios.padrao })
      .expect(200)
    expect(scoreResultSchema.parse(response.body)).toEqual(scoreFixture.padrao.nuv)
  })

  it('404 para cartão inexistente e 400 para cenário inválido', async () => {
    await request(app).post('/api/cards/nao-existe/score').send({ scenario: scenarios.padrao }).expect(404)
    await request(app).post('/api/cards/nuv/score').send({ scenario: { investment: 1 } }).expect(400)
  })
})

describe('rotas inexistentes, cabeçalhos de segurança e limite de uso', () => {
  it('404 em JSON para rota desconhecida', async () => {
    const response = await request(app).get('/api/nada').expect(404)
    expect(erroDe(response.body).code).toBe('NOT_FOUND')
  })

  it('helmet ativo e sem x-powered-by', async () => {
    const response = await request(app).get('/api/health')
    expect(response.headers['x-content-type-options']).toBe('nosniff')
    expect(response.headers['x-powered-by']).toBeUndefined()
  })

  it('CORS só libera a origem configurada', async () => {
    const permitida = await request(app).get('/api/health').set('Origin', 'http://localhost:5173')
    expect(permitida.headers['access-control-allow-origin']).toBe('http://localhost:5173')
    const negada = await request(app).get('/api/health').set('Origin', 'http://malvado.example')
    expect(negada.headers['access-control-allow-origin']).toBeUndefined()
  })

  it('429 depois de estourar o limite por minuto', async () => {
    const limitado = createTestApp({ rateLimit: 3 }).app
    for (let tentativa = 0; tentativa < 3; tentativa += 1) await request(limitado).get('/api/health').expect(200)
    const response = await request(limitado).get('/api/health').expect(429)
    expect(erroDe(response.body).code).toBe('RATE_LIMITED')
  })
})
