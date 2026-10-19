import { CRITERION_KEYS, RULES } from '@cardinal/shared'
import type { Card, Confidence, CriterionScores, Scenario, ScoreResult } from '@cardinal/shared'
import { calculateFee, pickTierValue } from './fee.ts'

const {
  maxScore: MAX_SCORE,
  monthsPerYear: MONTHS_PER_YEAR,
  feeAtZeroScore: FEE_AT_ZERO_SCORE,
  rewardsRateForFullScore: REWARDS_RATE_FOR_FULL_SCORE,
  unknownRewardsScore: UNKNOWN_REWARDS_SCORE,
  unknownLoungeScore: UNKNOWN_LOUNGE_SCORE,
  unknownExchangeScore: UNKNOWN_EXCHANGE_SCORE,
  sourcesDisagreePenalty: SOURCES_DISAGREE_PENALTY,
} = RULES

const CONFIDENCE_SCORE: Record<Confidence, number> = RULES.confidenceScore

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

  const totalWeight = CRITERION_KEYS.reduce((sum, key) => sum + scenario.weights[key], 0)

  const contributions = {} as CriterionScores
  let total = 0
  for (const key of CRITERION_KEYS) {
    const contribution =
      totalWeight > 0 ? (scenario.weights[key] * scores[key]) / totalWeight : 0
    contributions[key] = contribution
    total += contribution
  }

  return { fee, scores, confidenceScore, total, contributions, totalWeight, rewardsRate, annualRewards, loungeScore }
}
