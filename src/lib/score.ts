import { criteria } from '@/data/constants'
import type { Card, Confidence, CriterionScores, Scenario, ScoreResult } from '@/types'
import { calculateFee, pickTierValue } from './fee'

export const MAX_SCORE = 100
const MONTHS_PER_YEAR = 12
export const FEE_AT_ZERO_SCORE = 1500
export const REWARDS_RATE_FOR_FULL_SCORE = 2
export const UNKNOWN_REWARDS_SCORE = 30
export const UNKNOWN_LOUNGE_SCORE = 30
export const UNKNOWN_EXCHANGE_SCORE = 35
const SOURCES_DISAGREE_PENALTY = 15

const CONFIDENCE_SCORE: Record<Confidence, number> = { high: 100, medium: 65, low: 30 }

export function calculateScore(card: Card, scenario: Scenario): ScoreResult {
  const fee = calculateFee(card, scenario)

  const rewardsRate = pickTierValue(card.rewardsRateTiers, scenario.monthlySpend, card.rewardsRate)
  const loungeScore = pickTierValue(card.loungeScoreTiers, scenario.monthlySpend, card.loungeScore)

  const annualRewards =
    rewardsRate === null ? null : (scenario.monthlySpend * MONTHS_PER_YEAR * rewardsRate) / 100

  const feeScore =
    fee.status === 'exempt'
      ? MAX_SCORE
      : fee.annualCost === null
        ? 0
        : Math.round(MAX_SCORE * (1 - Math.min(fee.annualCost, FEE_AT_ZERO_SCORE) / FEE_AT_ZERO_SCORE))

  const scores: CriterionScores = {
    annualFee: feeScore,
    rewards:
      rewardsRate === null
        ? UNKNOWN_REWARDS_SCORE
        : Math.min(rewardsRate / REWARDS_RATE_FOR_FULL_SCORE, 1) * MAX_SCORE,
    loungeAccess: loungeScore === null ? UNKNOWN_LOUNGE_SCORE : loungeScore,
    exchangeRate: card.exchangeScore === null ? UNKNOWN_EXCHANGE_SCORE : card.exchangeScore,
  }

  const confidenceScore = Math.max(
    0,
    CONFIDENCE_SCORE[card.confidence] - (card.sourcesDisagree ? SOURCES_DISAGREE_PENALTY : 0),
  )

  const totalWeight = criteria.reduce((sum, criterion) => sum + scenario.weights[criterion.key], 0)

  const contributions = {} as CriterionScores
  let total = 0
  for (const { key } of criteria) {
    const contribution =
      totalWeight > 0 ? (scenario.weights[key] * scores[key]) / totalWeight : 0
    contributions[key] = contribution
    total += contribution
  }

  return { fee, scores, confidenceScore, total, contributions, totalWeight, rewardsRate, annualRewards, loungeScore }
}
