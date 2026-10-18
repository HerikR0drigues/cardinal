import { useMemo } from 'react'
import { cards } from '../data/cards'
import { filterCards } from '../lib/filter'
import { sortCards } from '../lib/sort'
import type { Card, Filters, Scenario, Sorting } from '../types'

export function useRanking(scenario: Scenario, filters: Filters, sorting: Sorting): Card[] {
  return useMemo(
    () => sortCards(filterCards(cards, scenario, filters), scenario, sorting),
    [scenario, filters, sorting],
  )
}
