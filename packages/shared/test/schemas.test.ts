import { describe, expect, it } from 'vitest'
import {
  CONFIDENCES,
  DEFAULT_FILTERS,
  DEFAULT_SORTING,
  LIMITS,
  RULES,
  cardSummarySchema,
  filtersSchema,
  rankingRequestSchema,
  scenarioSchema,
  weightsSchema,
} from '../src/index.ts'

const weights = { annualFee: 40, rewards: 25, loungeAccess: 25, exchangeRate: 10 }
const scenario = {
  investment: 60000,
  monthlySpend: 2000,
  weights,
  hasSalaryPortability: true,
  ignoreEntryRequirement: true,
}

describe('scenarioSchema', () => {
  it('aceita um cenário válido', () => {
    expect(scenarioSchema.parse(scenario)).toEqual(scenario)
  })

  it.each([
    ['aporte negativo', { ...scenario, investment: -1 }],
    ['aporte acima do limite', { ...scenario, investment: LIMITS.maxInvestment + 1 }],
    ['gasto acima do limite', { ...scenario, monthlySpend: LIMITS.maxMonthlySpend + 1 }],
    ['aporte não finito', { ...scenario, investment: Number.POSITIVE_INFINITY }],
    ['aporte como texto', { ...scenario, investment: '60000' }],
    ['regra booleana ausente', { ...scenario, hasSalaryPortability: undefined }],
  ])('rejeita %s', (_nome, entrada) => {
    expect(scenarioSchema.safeParse(entrada).success).toBe(false)
  })

  it('aceita os limites exatos', () => {
    expect(scenarioSchema.safeParse({ ...scenario, investment: 0, monthlySpend: 0 }).success).toBe(true)
    expect(
      scenarioSchema.safeParse({
        ...scenario,
        investment: LIMITS.maxInvestment,
        monthlySpend: LIMITS.maxMonthlySpend,
      }).success,
    ).toBe(true)
  })
})

describe('weightsSchema', () => {
  it('rejeita peso fora de 0 a 100 e chave faltando', () => {
    expect(weightsSchema.safeParse({ ...weights, rewards: 101 }).success).toBe(false)
    expect(weightsSchema.safeParse({ ...weights, rewards: -1 }).success).toBe(false)
    expect(weightsSchema.safeParse({ annualFee: 1, rewards: 1, loungeAccess: 1 }).success).toBe(false)
  })
})

describe('filtros e ordenação', () => {
  it('os padrões mostram todos os cartões, ordenados por nota', () => {
    expect(DEFAULT_FILTERS.includeSpendOnly).toBe(true)
    expect(DEFAULT_SORTING).toEqual({ key: 'score', direction: 'desc' })
  })

  it('rankingRequestSchema preenche filtros e ordenação ausentes com os padrões', () => {
    const parsed = rankingRequestSchema.parse({ scenario })
    expect(parsed.filters).toEqual(DEFAULT_FILTERS)
    expect(parsed.sorting).toEqual(DEFAULT_SORTING)
  })

  it('rejeita grupo desconhecido e busca longa demais', () => {
    expect(filtersSchema.safeParse({ ...DEFAULT_FILTERS, group: 'cripto' }).success).toBe(false)
    expect(
      filtersSchema.safeParse({ ...DEFAULT_FILTERS, searchText: 'x'.repeat(LIMITS.maxSearchLength + 1) }).success,
    ).toBe(false)
  })
})

describe('cardSummarySchema', () => {
  const card = {
    id: 'x',
    name: 'Cartão X',
    issuer: 'Banco',
    network: 'Visa',
    group: 'digitalBank',
    annualFee: 0,
    feeRule: 'Sem anuidade.',
    rewardsText: 'Sem retorno.',
    rewardsRate: null,
    loungeText: 'Sem sala.',
    loungeSummary: 'Nenhuma',
    loungeScore: null,
    exchangeText: 'n/i',
    exchangeScore: null,
    confidence: 'low',
  }

  it('descarta as fontes (a lista é leve; elas vêm no detalhe)', () => {
    const parsed = cardSummarySchema.parse({ ...card, sources: ['https://exemplo.com'] })
    expect('sources' in parsed).toBe(false)
  })

  it('mantém null onde ele significa "não informado"', () => {
    const parsed = cardSummarySchema.parse(card)
    expect(parsed.rewardsRate).toBeNull()
    expect(parsed.loungeScore).toBeNull()
  })
})

describe('RULES', () => {
  it('tem uma nota de confiança para cada nível de confiança', () => {
    expect(Object.keys(RULES.confidenceScore).sort()).toEqual([...CONFIDENCES].sort())
  })
})
