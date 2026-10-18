export type Group = 'broker' | 'traditionalBank' | 'digitalBank' | 'global'
export type Confidence = 'high' | 'medium' | 'low'
export type FeeStatus = 'exempt' | 'partial' | 'unreachable'
export type CriterionKey = 'annualFee' | 'rewards' | 'loungeAccess' | 'exchangeRate'

export type Weights = Record<CriterionKey, number>

export type Tier = [number, number][]

export interface FeeResult {
  annualCost: number | null
  status: FeeStatus
  label: string
}

export interface Filters {
  group: 'all' | Group
  feeStatus: 'all' | FeeStatus
  loungeOnly: boolean
  searchText: string
  includeSpendOnly: boolean
}

export type SortKey =
  | 'score'
  | 'name'
  | 'annualCost'
  | 'annualFee'
  | 'rewards'
  | 'lounge'
  | 'exchange'
  | 'confidence'

export type SortDirection = 'asc' | 'desc'

export interface Sorting {
  key: SortKey
  direction: SortDirection
}

export interface SortOption {
  value: SortKey
  label: string
}

export interface Card {
  id: string
  name: string
  issuer: string
  network: string
  group: Group
  annualFee: number
  feeRule: string
  rewardsText: string
  rewardsRate: number | null
  loungeText: string
  loungeSummary: string
  loungeScore: number | null
  exchangeText: string
  exchangeScore: number | null
  confidence: Confidence
  exchangeSummary?: string
  notes?: string
  exemptionInvestment?: number
  halfDiscountInvestment?: number
  requiresInvestmentToIssue?: boolean
  caveat?: string
  rewardsRateTiers?: Tier
  loungeScoreTiers?: Tier
  loungeSummaryLow?: string
  fixedAnnualFee?: number
  monthlyFeeWithSalary?: number
  monthlyFeeWithoutSalary?: number
  entryRequirement?: number
  entryRequirementLabel?: string
  feeLabelOutOfReach?: string
  statusTag?: string
  isReference?: boolean
  acceptsSalaryPortability?: boolean
  isFeeUncertain?: boolean
  sourcesDisagree?: boolean
  sources?: string[]
}

export interface Scenario {
  investment: number
  monthlySpend: number
  weights: Weights
  hasSalaryPortability: boolean
  ignoreEntryRequirement: boolean
}

export type CriterionScores = Record<CriterionKey, number>

export interface ScoreResult {
  fee: FeeResult
  scores: CriterionScores
  confidenceScore: number
  total: number
  contributions: CriterionScores
  totalWeight: number
  rewardsRate: number | null
  annualRewards: number | null
  loungeScore: number | null
}

export interface Criterion {
  key: CriterionKey
  label: string
  color: string
}

export interface WeightPreset {
  name: string
  weights: Weights
}

export interface GroupOption {
  value: 'all' | Group
  label: string
}

export interface FeeStatusOption {
  value: 'all' | FeeStatus
  label: string
}

export type Theme = 'light' | 'dark'
