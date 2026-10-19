import type { Card, Filters, Scenario, Sorting } from '@cardinal/shared'
import { matchesFilters } from './filter.ts'
import { calculateScore } from './score.ts'
import { compareScored, type ScoredCard } from './sort.ts'

// Domain = regras de negócio como funções puras: entra dado, sai dado. Sem HTTP, sem banco.
// É a camada mais fácil de testar e a primeira a olhar quando uma nota vem errada.
export interface Ranking {
  items: ScoredCard[]
  hiddenSpendOnlyCount: number
}

export function rankCards(
  cards: Card[],
  scenario: Scenario,
  filters: Filters,
  sorting: Sorting,
): Ranking {
  const scored = cards.map((card) => ({ card, result: calculateScore(card, scenario) }))
  const items = scored
    .filter(({ card, result }) => matchesFilters(card, result, filters))
    .sort((a, b) => compareScored(a, b, sorting))

  const hiddenSpendOnlyCount = filters.includeSpendOnly
    ? 0
    : scored.filter(({ card, result }) =>
        matchesFilters(card, result, { ...filters, includeSpendOnly: true }),
      ).length - items.length

  return { items, hiddenSpendOnlyCount }
}
