import { useState } from 'react'
import InvestmentPanel from '@/components/InvestmentPanel'
import Pill from '@/components/Pill'
import RulesPanel from '@/components/RulesPanel'
import SpendPanel from '@/components/SpendPanel'
import WeightsPanel from '@/components/WeightsPanel'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { getUpdateScenario, useScenario, useScenarioStore } from '@/store/scenarioStore'
import styles from './Sidebar.module.sass'

const DESKTOP_QUERY = '(min-width: 64rem)'

export default function Sidebar() {
  const scenario = useScenario()
  const updateScenario = useScenarioStore(getUpdateScenario)
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const [isAdjustmentsOpen, setIsAdjustmentsOpen] = useState(false)
  const showControls = isDesktop || isAdjustmentsOpen

  return (
    <aside className={styles.sidebar}>
      {!isDesktop && (
        <div className={styles.mobileBar}>
          <Pill
            label="Ajustes do cálculo"
            isActive={isAdjustmentsOpen}
            onClick={() => setIsAdjustmentsOpen(!isAdjustmentsOpen)}
          />
        </div>
      )}
      {showControls && (
        <>
          <InvestmentPanel
            investment={scenario.investment}
            onInvestmentChange={(investment) => updateScenario({ investment })}
          />
          <SpendPanel
            monthlySpend={scenario.monthlySpend}
            onMonthlySpendChange={(monthlySpend) => updateScenario({ monthlySpend })}
          />
          <WeightsPanel
            weights={scenario.weights}
            onWeightsChange={(weights) => updateScenario({ weights })}
          />
          <RulesPanel
            ignoreEntryRequirement={scenario.ignoreEntryRequirement}
            hasSalaryPortability={scenario.hasSalaryPortability}
            onIgnoreEntryRequirementChange={(ignoreEntryRequirement) =>
              updateScenario({ ignoreEntryRequirement })
            }
            onHasSalaryPortabilityChange={(hasSalaryPortability) =>
              updateScenario({ hasSalaryPortability })
            }
          />
        </>
      )}
    </aside>
  )
}
