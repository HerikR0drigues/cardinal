export type {
  Card,
  CardSummary,
  Confidence,
  CriterionKey,
  CriterionScores,
  FeeResult,
  FeeStatus,
  Filters,
  Group,
  Meta,
  RankingItem,
  RankingRequest,
  RankingResponse,
  Scenario,
  ScoreResult,
  SortDirection,
  SortKey,
  Sorting,
  Tier,
  Weights,
} from '@cardinal/shared'

import type { CriterionKey, FeeStatus, Group, SortKey, Weights } from '@cardinal/shared'

export interface SortOption {
  value: SortKey
  label: string
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
