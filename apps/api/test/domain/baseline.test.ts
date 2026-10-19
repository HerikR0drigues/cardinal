import type { ScoreResult } from '@cardinal/shared'
import { describe, expect, it } from 'vitest'
import { cards } from '../../src/db/seed/cards.data.ts'
import { calculateScore } from '../../src/domain/score.ts'
import { metaFixture, scenarios, scoreFixture } from '../helpers/fixtures.ts'

describe('regras de anuidade e nota (paridade com o front antigo)', () => {
  it('a fixture cobre todos os cartões em todos os cenários', () => {
    expect(Object.keys(scenarios)).toHaveLength(20)
    for (const name of Object.keys(scenarios)) {
      expect(Object.keys(scoreFixture[name])).toHaveLength(cards.length)
    }
    expect(cards).toHaveLength(metaFixture.totalCards)
  })

  describe.each(Object.keys(scenarios))('cenário %s', (name) => {
    it('devolve resultado idêntico para os 121 cartões', () => {
      const actual: Record<string, ScoreResult> = {}
      for (const card of cards) actual[card.id] = calculateScore(card, scenarios[name])
      expect(actual).toEqual(scoreFixture[name])
    })
  })

  it('golden number: Nubank Ultravioleta no cenário padrão soma 81,275', () => {
    const nuv = cards.find((card) => card.id === 'nuv')!
    const result = calculateScore(nuv, scenarios.padrao)
    expect(result.total).toBeCloseTo(81.275, 9)
    expect(result.fee.status).toBe('exempt')
    expect(result.annualRewards).toBeCloseTo(300, 9)
  })
})
