import type { Card, Filters, Scenario } from '@/types'
import { isSpendOnly } from './fee'
import { calculateScore } from './score'

export const DEFAULT_FILTERS: Filters = {
  group: 'all',
  feeStatus: 'all',
  loungeOnly: false,
  searchText: '',
  includeSpendOnly: true,
}

export function filterCards(cards: Card[], scenario: Scenario, filters: Filters): Card[] {
  const search = filters.searchText.trim().toLowerCase()

  return cards.filter((card) => {
    if (filters.group !== 'all' && card.group !== filters.group) return false
    if (!filters.includeSpendOnly && isSpendOnly(card)) return false

    const result = calculateScore(card, scenario)
    if (filters.feeStatus !== 'all' && result.fee.status !== filters.feeStatus) return false
    if (filters.loungeOnly && !((result.loungeScore ?? 0) > 0)) return false

    if (search) {
      const searchableText = `${card.name} ${card.issuer} ${card.network}`.toLowerCase()
      if (!searchableText.includes(search)) return false
    }
    return true
  })
}
