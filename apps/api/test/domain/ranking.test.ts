import { describe, expect, it } from 'vitest'
import { cards } from '../../src/db/seed/cards.data.ts'
import { rankCards } from '../../src/domain/ranking.ts'
import { rankingFixture, scenarios } from '../helpers/fixtures.ts'

describe('ranking: filtro e ordenação (paridade com o front antigo)', () => {
  it.each(rankingFixture.map((item) => [item.nome, item] as const))('%s', (_nome, caso) => {
    const { items } = rankCards(cards, scenarios[caso.scenario], caso.filters, caso.sorting)
    expect(items.map(({ card }) => card.id)).toEqual(caso.ids)
    expect(items).toHaveLength(caso.total)
  })

  it('hiddenSpendOnlyCount é a diferença entre incluir e ocultar os só por gasto', () => {
    const base = rankingFixture.find((item) => item.nome === 'padrao')!
    const oculta = rankingFixture.find((item) => item.nome === 'padraoOcultandoSoGasto')!
    const { hiddenSpendOnlyCount } = rankCards(cards, scenarios.padrao, oculta.filters, oculta.sorting)
    expect(hiddenSpendOnlyCount).toBe(base.total - oculta.total)
    expect(rankCards(cards, scenarios.padrao, base.filters, base.sorting).hiddenSpendOnlyCount).toBe(0)
  })
})
