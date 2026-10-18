import { useMemo, useState } from 'react'
import { weightPresets } from '../data/constants'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useRanking } from '../hooks/useRanking'
import { DEFAULT_FILTERS } from '../lib/filter'
import { DEFAULT_SORTING } from '../lib/sort'
import { isFiniteNumber, isWeights } from '../lib/validators'
import type { Filters, Scenario, Sorting, Weights } from '../types'
import CardList from './CardList'
import InvestmentPanel from './InvestmentPanel'
import styles from './Main.module.scss'
import RulesPanel from './RulesPanel'
import SortControl from './SortControl'
import SpendPanel from './SpendPanel'
import Toolbar from './Toolbar'
import WeightsPanel from './WeightsPanel'

export default function Main() {
  const [investment, setInvestment] = useLocalStorage('cardinal.investment', 60000, isFiniteNumber)
  const [monthlySpend, setMonthlySpend] = useLocalStorage('cardinal.monthlySpend', 2000, isFiniteNumber)
  const [weights, setWeights] = useLocalStorage<Weights>(
    'cardinal.weights',
    weightPresets[0].weights,
    isWeights,
  )
  const [hasSalaryPortability, setHasSalaryPortability] = useState(true)
  const [ignoreEntryRequirement, setIgnoreEntryRequirement] = useState(true)
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [sorting, setSorting] = useState<Sorting>(DEFAULT_SORTING)

  const scenario = useMemo<Scenario>(
    () => ({
      investment,
      monthlySpend,
      weights,
      hasSalaryPortability,
      ignoreEntryRequirement,
    }),
    [investment, monthlySpend, weights, hasSalaryPortability, ignoreEntryRequirement],
  )

  const rankedCards = useRanking(scenario, filters, sorting)

  return (
    <main className={styles.main}>
      <div className={styles.controls}>
        <InvestmentPanel investment={investment} onInvestmentChange={setInvestment} />
        <SpendPanel monthlySpend={monthlySpend} onMonthlySpendChange={setMonthlySpend} />
        <WeightsPanel weights={weights} onWeightsChange={setWeights} />
      </div>
      <section className={styles.filters}>
        <RulesPanel
          ignoreEntryRequirement={ignoreEntryRequirement}
          hasSalaryPortability={hasSalaryPortability}
          onIgnoreEntryRequirementChange={setIgnoreEntryRequirement}
          onHasSalaryPortabilityChange={setHasSalaryPortability}
        />
        <Toolbar filters={filters} onFiltersChange={setFilters} />
        <SortControl sorting={sorting} onSortingChange={setSorting} />
      </section>
      <CardList cards={rankedCards} scenario={scenario} />
    </main>
  )
}
