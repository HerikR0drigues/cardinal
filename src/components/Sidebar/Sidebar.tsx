import { useState } from 'react'
import Brand from '@/components/Brand'
import InvestmentPanel from '@/components/InvestmentPanel'
import Pill from '@/components/Pill'
import RulesPanel from '@/components/RulesPanel'
import SpendPanel from '@/components/SpendPanel'
import ThemeToggle from '@/components/ThemeToggle'
import WeightsPanel from '@/components/WeightsPanel'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { Scenario } from '@/types'
import styles from './Sidebar.module.sass'

const DESKTOP_QUERY = '(min-width: 64rem)'

interface SidebarProps {
  scenario: Scenario
  onScenarioChange: (changes: Partial<Scenario>) => void
}

export default function Sidebar({ scenario, onScenarioChange }: Readonly<SidebarProps>) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const [isAdjustmentsOpen, setIsAdjustmentsOpen] = useState(false)
  const showControls = isDesktop || isAdjustmentsOpen

  return (
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
          <InvestmentPanel
            investment={scenario.investment}
            onInvestmentChange={(investment) => onScenarioChange({ investment })}
          />
          <SpendPanel
            monthlySpend={scenario.monthlySpend}
            onMonthlySpendChange={(monthlySpend) => onScenarioChange({ monthlySpend })}
          />
          <WeightsPanel
            weights={scenario.weights}
            onWeightsChange={(weights) => onScenarioChange({ weights })}
          />
          <RulesPanel
            ignoreEntryRequirement={scenario.ignoreEntryRequirement}
            hasSalaryPortability={scenario.hasSalaryPortability}
            onIgnoreEntryRequirementChange={(ignoreEntryRequirement) =>
              onScenarioChange({ ignoreEntryRequirement })
            }
            onHasSalaryPortabilityChange={(hasSalaryPortability) =>
              onScenarioChange({ hasSalaryPortability })
            }
          />
        </>
      )}
    </aside>
  )
}
