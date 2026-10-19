import { useMemo, useState } from 'react'
import CardList from '@/components/CardList'
import SortControl from '@/components/SortControl'
import Toolbar from '@/components/Toolbar'
import { cards } from '@/data/cards'
import { useRanking } from '@/hooks/useRanking'
import { DEFAULT_FILTERS, filterCards } from '@/lib/filter'
import { DEFAULT_SORTING } from '@/lib/sort'
import { useScenario } from '@/store/scenarioStore'
import type { Filters, Sorting } from '@/types'
import styles from './CardResults.module.sass'

export default function CardResults() {
  const scenario = useScenario()
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [sorting, setSorting] = useState<Sorting>(DEFAULT_SORTING)
  const rankedCards = useRanking(scenario, filters, sorting)
  const hiddenSpendOnlyCount = useMemo(
    () =>
      filters.includeSpendOnly
        ? 0
        : filterCards(cards, scenario, { ...filters, includeSpendOnly: true }).length -
          rankedCards.length,
    [filters, scenario, rankedCards.length],
  )

  return (
    <main className={styles.main}>
      <Toolbar filters={filters} onFiltersChange={setFilters} />
      <div className={styles.resultsBar}>
        <div className={styles.summary}>
          <p className={styles.count}>{rankedCards.length} cartões</p>
          {hiddenSpendOnlyCount > 0 && (
            <p className={styles.hidden}>
              {hiddenSpendOnlyCount} {hiddenSpendOnlyCount === 1 ? 'cartão que só zera' : 'cartões que só zeram'} por
              gasto {hiddenSpendOnlyCount === 1 ? 'está oculto' : 'estão ocultos'}.{' '}
              <button
                type="button"
                className={styles.show}
                onClick={() => setFilters({ ...filters, includeSpendOnly: true })}
              >
                Mostrar
              </button>
            </p>
          )}
        </div>
        <SortControl sorting={sorting} onSortingChange={setSorting} />
      </div>
      <CardList cards={rankedCards} scenario={scenario} />
    </main>
  )
}
