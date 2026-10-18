import { useState } from 'react'
import CardList from '@/components/CardList'
import SortControl from '@/components/SortControl'
import Toolbar from '@/components/Toolbar'
import { useRanking } from '@/hooks/useRanking'
import { DEFAULT_FILTERS } from '@/lib/filter'
import { DEFAULT_SORTING } from '@/lib/sort'
import type { Filters, Scenario, Sorting } from '@/types'
import styles from './CardResults.module.sass'

interface CardResultsProps {
  scenario: Scenario
}

export default function CardResults({ scenario }: Readonly<CardResultsProps>) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [sorting, setSorting] = useState<Sorting>(DEFAULT_SORTING)
  const rankedCards = useRanking(scenario, filters, sorting)

  return (
    <main className={styles.main}>
      <Toolbar filters={filters} onFiltersChange={setFilters} />
      <div className={styles.resultsBar}>
        <p className={styles.count}>{rankedCards.length} cartões</p>
        <SortControl sorting={sorting} onSortingChange={setSorting} />
      </div>
      <CardList cards={rankedCards} scenario={scenario} />
    </main>
  )
}
