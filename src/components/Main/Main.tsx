import { useMemo, useState } from 'react'
import { weightPresets } from '@/data/constants'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useRanking } from '@/hooks/useRanking'
import { DEFAULT_FILTERS } from '@/lib/filter'
import { DEFAULT_SORTING } from '@/lib/sort'
import { isFiniteNumber, isWeights } from '@/lib/validators'
import type { Filters, Scenario, Sorting, Weights } from '@/types'
import Brand from '@/components/Brand'
import CardList from '@/components/CardList'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import InvestmentPanel from '@/components/InvestmentPanel'
import Pill from '@/components/Pill'
import styles from './Main.module.sass'
import RulesPanel from '@/components/RulesPanel'
import SortControl from '@/components/SortControl'
import SpendPanel from '@/components/SpendPanel'
import ThemeToggle from '@/components/ThemeToggle'
import Toolbar from '@/components/Toolbar'
import WeightsPanel from '@/components/WeightsPanel'

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
  const isDesktop = useMediaQuery('(min-width: 64rem)')
  const [isAdjustmentsOpen, setIsAdjustmentsOpen] = useState(false)
  const showControls = isDesktop || isAdjustmentsOpen
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
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <Brand />
          <div className={styles.brandActions}>
            {!isDesktop && (
              <Pill
                label="Ajustes do cálculo"
                isActive={isAdjustmentsOpen}
                onClick={() => setIsAdjustmentsOpen(!isAdjustmentsOpen)}
              />
            )}
            <ThemeToggle />
          </div>
        </div>
        {showControls && (
          <>
            <InvestmentPanel investment={investment} onInvestmentChange={setInvestment} />
            <SpendPanel monthlySpend={monthlySpend} onMonthlySpendChange={setMonthlySpend} />
            <WeightsPanel weights={weights} onWeightsChange={setWeights} />
            <RulesPanel
              ignoreEntryRequirement={ignoreEntryRequirement}
              hasSalaryPortability={hasSalaryPortability}
              onIgnoreEntryRequirementChange={setIgnoreEntryRequirement}
              onHasSalaryPortabilityChange={setHasSalaryPortability}
            />
          </>
        )}
      </aside>
      <div className={styles.content}>
        <Header />
        <main className={styles.main}>
          <Toolbar filters={filters} onFiltersChange={setFilters} />
          <div className={styles.resultsBar}>
            <p className={styles.count}>{rankedCards.length} cartões</p>
            <SortControl sorting={sorting} onSortingChange={setSorting} />
          </div>
          <CardList cards={rankedCards} scenario={scenario} />
        </main>
        <Footer />
      </div>
    </div>
  )
}
