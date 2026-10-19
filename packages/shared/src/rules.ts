export const RULES = {
  maxScore: 100,
  monthsPerYear: 12,
  moduleDiscountPerStep: 10,
  moduleDiscountStepInvestment: 10_000,
  feeAtZeroScore: 1500,
  rewardsRateForFullScore: 2,
  unknownRewardsScore: 30,
  unknownLoungeScore: 30,
  unknownExchangeScore: 35,
  sourcesDisagreePenalty: 15,
  confidenceScore: { high: 100, medium: 65, low: 30 },
} as const
