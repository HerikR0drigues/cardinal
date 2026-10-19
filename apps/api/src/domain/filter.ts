import type { Card, Filters, ScoreResult } from '@cardinal/shared'
import { isSpendOnly } from './fee.ts'

export function matchesFilters(card: Card, result: ScoreResult, filters: Filters): boolean {
  if (filters.group !== 'all' && card.group !== filters.group) return false
  if (!filters.includeSpendOnly && isSpendOnly(card)) return false
  if (filters.feeStatus !== 'all' && result.fee.status !== filters.feeStatus) return false
  if (filters.loungeOnly && !((result.loungeScore ?? 0) > 0)) return false

  const search = filters.searchText.trim().toLowerCase()
  if (!search) return true
  const searchableText = `${card.name} ${card.issuer} ${card.network}`.toLowerCase()
  return searchableText.includes(search)
}
