import { z } from 'zod'
import {
  FEE_STATUSES,
  GROUPS,
  LIMITS,
  SORT_DIRECTIONS,
  SORT_KEYS,
} from '../constants.ts'
import { cardSummarySchema } from './card.ts'
import { scenarioSchema } from './scenario.ts'

export const feeResultSchema = z.object({
  annualCost: z.number().nullable(),
  status: z.enum(FEE_STATUSES),
  label: z.string(),
})

const criterionScoresSchema = z.object({
  annualFee: z.number(),
  rewards: z.number(),
  loungeAccess: z.number(),
  exchangeRate: z.number(),
})

export const scoreResultSchema = z.object({
  fee: feeResultSchema,
  scores: criterionScoresSchema,
  confidenceScore: z.number(),
  total: z.number(),
  contributions: criterionScoresSchema,
  totalWeight: z.number(),
  rewardsRate: z.number().nullable(),
  annualRewards: z.number().nullable(),
  loungeScore: z.number().nullable(),
})

export const filtersSchema = z.object({
  group: z.enum(['all', ...GROUPS]),
  feeStatus: z.enum(['all', ...FEE_STATUSES]),
  loungeOnly: z.boolean(),
  searchText: z.string().max(LIMITS.maxSearchLength),
  includeSpendOnly: z.boolean(),
})

export const sortingSchema = z.object({
  key: z.enum(SORT_KEYS),
  direction: z.enum(SORT_DIRECTIONS),
})

export const DEFAULT_FILTERS: Filters = {
  group: 'all',
  feeStatus: 'all',
  loungeOnly: false,
  searchText: '',
  includeSpendOnly: true,
}

export const DEFAULT_SORTING: Sorting = { key: 'score', direction: 'desc' }

export const rankingRequestSchema = z.object({
  scenario: scenarioSchema,
  filters: filtersSchema.default(DEFAULT_FILTERS),
  sorting: sortingSchema.default(DEFAULT_SORTING),
})

export const rankingItemSchema = z.object({
  card: cardSummarySchema,
  result: scoreResultSchema,
})

export const rankingResponseSchema = z.object({
  items: z.array(rankingItemSchema),
  total: z.number().int().min(0),
  hiddenSpendOnlyCount: z.number().int().min(0),
})

export const scoreRequestSchema = z.object({ scenario: scenarioSchema })

export type FeeResult = z.infer<typeof feeResultSchema>
export type ScoreResult = z.infer<typeof scoreResultSchema>
export type Filters = z.infer<typeof filtersSchema>
export type Sorting = z.infer<typeof sortingSchema>
export type RankingRequest = z.input<typeof rankingRequestSchema>
export type RankingItem = z.infer<typeof rankingItemSchema>
export type RankingResponse = z.infer<typeof rankingResponseSchema>
