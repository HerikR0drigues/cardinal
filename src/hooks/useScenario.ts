import { useMemo, useState } from 'react'
import { weightPresets } from '@/data/constants'
import { isFiniteNumber, isWeights } from '@/lib/validators'
import type { Scenario, Weights } from '@/types'
import { useLocalStorage } from './useLocalStorage'

export function useScenario() {
  const [investment, setInvestment] = useLocalStorage('cardinal.investment', 60000, isFiniteNumber)
  const [monthlySpend, setMonthlySpend] = useLocalStorage('cardinal.monthlySpend', 2000, isFiniteNumber)
  const [weights, setWeights] = useLocalStorage<Weights>(
    'cardinal.weights',
    weightPresets[0].weights,
    isWeights,
  )
  const [hasSalaryPortability, setHasSalaryPortability] = useState(true)
  const [ignoreEntryRequirement, setIgnoreEntryRequirement] = useState(true)

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

  const updateScenario = (changes: Partial<Scenario>) => {
    if (changes.investment !== undefined) setInvestment(changes.investment)
    if (changes.monthlySpend !== undefined) setMonthlySpend(changes.monthlySpend)
    if (changes.weights !== undefined) setWeights(changes.weights)
    if (changes.hasSalaryPortability !== undefined) {
      setHasSalaryPortability(changes.hasSalaryPortability)
    }
    if (changes.ignoreEntryRequirement !== undefined) {
      setIgnoreEntryRequirement(changes.ignoreEntryRequirement)
    }
  }

  return { scenario, updateScenario }
}
