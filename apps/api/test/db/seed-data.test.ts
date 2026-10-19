import { cardSchema } from '@cardinal/shared'
import { describe, expect, it } from 'vitest'
import { cards } from '../../src/db/seed/cards.data.ts'

const COMPANHIA_AEREA = /azul|latam|smiles|\bgol\b|\btap\b|aadvantage|united|mileageplus/i
const TEXTOS = ['feeRule', 'rewardsText', 'loungeText', 'exchangeText', 'notes', 'caveat'] as const
const VOZ_DE_PESQUISADOR =
  /\bn[ãa]o (achei|encontrei|consegui|localizei|confirmei)\b|\b(achei|encontrei|conferi)\b|\bo dono\b|\bcitou\b/i

describe('integridade dos dados dos cartões', () => {
  it('todos cumprem o contrato do shared (tipos e faixas)', () => {
    for (const card of cards) {
      const result = cardSchema.safeParse(card)
      expect(result.success, `${card.id}: ${result.success ? '' : result.error.message}`).toBe(true)
    }
  })

  it('ids e nomes são únicos', () => {
    expect(new Set(cards.map((card) => card.id)).size).toBe(cards.length)
    expect(new Set(cards.map((card) => card.name)).size).toBe(cards.length)
  })

  it('nenhum texto exibido ao usuário tem voz de pesquisador ("não achei", "o dono"...)', () => {
    const achados = cards.flatMap((card) =>
      TEXTOS.filter((campo) => VOZ_DE_PESQUISADOR.test(card[campo] ?? '')).map((campo) => `${card.id}.${campo}`),
    )
    expect(achados).toEqual([])
  })

  it('cartões de companhia aérea só têm isenção por investimento quando documentada (Santander AAdvantage Black)', () => {
    const comRegra = cards
      .filter((card) => COMPANHIA_AEREA.test(`${card.name} ${card.network}`))
      .filter(
        (card) =>
          card.exemptionInvestment !== undefined ||
          card.halfDiscountInvestment !== undefined ||
          card.acceptsSalaryPortability ||
          card.requiresInvestmentToIssue,
      )
      .map((card) => card.id)
    expect(comRegra).toEqual(['saa'])
  })

  it('o Nubank padrão é um cartão só (Gold) e não há "Platinum (roxinho)" duplicado', () => {
    const nubank = cards.filter((card) => card.issuer === 'Nubank').map((card) => card.id)
    expect(nubank.sort()).toEqual(['nub', 'nucr', 'nuv'])
  })
})
