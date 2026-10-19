export const CRITERION_KEYS = ['annualFee', 'rewards', 'loungeAccess', 'exchangeRate'] as const
export const GROUPS = ['broker', 'traditionalBank', 'digitalBank', 'global'] as const
export const CONFIDENCES = ['high', 'medium', 'low'] as const
export const FEE_STATUSES = ['exempt', 'partial', 'unreachable'] as const
export const SORT_KEYS = [
  'score',
  'name',
  'annualCost',
  'annualFee',
  'rewards',
  'lounge',
  'exchange',
  'confidence',
] as const
export const SORT_DIRECTIONS = ['asc', 'desc'] as const

export const LIMITS = {
  maxInvestment: 100_000_000,
  maxMonthlySpend: 1_000_000,
  maxWeight: 100,
  maxSearchLength: 80,
} as const
