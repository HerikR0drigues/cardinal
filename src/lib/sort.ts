import type { Card, ScoreResult, Scenario, SortKey, Sorting } from '@/types'
import { calculateScore } from './score'

export const DEFAULT_SORTING: Sorting = { key: 'score', direction: 'desc' }

function sortValue(card: Card, result: ScoreResult, key: SortKey): number | string | null {
  switch (key) {
    case 'score':
      return result.total
    case 'name':
      return card.name
    case 'annualCost':
      return result.fee.annualCost
    case 'annualFee':
      return card.annualFee
    case 'rewards':
      return result.rewardsRate
    case 'lounge':
      return result.loungeScore
    case 'exchange':
      return card.exchangeScore
    case 'confidence':
      return result.confidenceScore
  }
}

export function sortCards(cards: Card[], scenario: Scenario, sorting: Sorting): Card[] {
  const direction = sorting.direction === 'desc' ? -1 : 1
  const rows = cards.map((card) => ({ card, result: calculateScore(card, scenario) }))

  rows.sort((a, b) => {
    const valueA = sortValue(a.card, a.result, sorting.key)
    const valueB = sortValue(b.card, b.result, sorting.key)

    if (valueA === null && valueB === null) return 0
    if (valueA === null) return 1
    if (valueB === null) return -1
    if (typeof valueA === 'string' || typeof valueB === 'string') {
      return direction * String(valueA).localeCompare(String(valueB), 'pt-BR')
    }
    return direction * (valueA - valueB) || b.result.total - a.result.total
  })

  return rows.map((row) => row.card)
}
