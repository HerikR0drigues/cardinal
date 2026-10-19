import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Filters, ScoreResult, Scenario, Sorting } from '@cardinal/shared'

function load<T>(name: string): T {
  return JSON.parse(readFileSync(resolve(import.meta.dirname, '../fixtures', name), 'utf8')) as T
}

export interface RankingCase {
  nome: string
  scenario: string
  filters: Filters
  sorting: Sorting
  ids: string[]
  total: number
}

export const scoreFixture = load<Record<string, Record<string, ScoreResult>>>('score.json')
export const scenarios = load<Record<string, Scenario>>('scenarios.json')
export const rankingFixture = load<RankingCase[]>('ranking.json')
export const metaFixture = load<{ totalCards: number; spendOnlyCards: number }>('meta.json')
