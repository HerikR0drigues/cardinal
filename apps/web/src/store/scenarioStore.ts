import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'
import { weightPresets } from '@/data/constants'
import { isFiniteNumber, isWeights } from '@/lib/validators'
import type { Scenario } from '@/types'

type PersistedScenario = Pick<Scenario, 'investment' | 'monthlySpend' | 'weights'>

interface ScenarioStore extends Scenario {
  updateScenario: (changes: Partial<Scenario>) => void
}

function readPersistedScenario(persisted: unknown): Partial<PersistedScenario> {
  if (typeof persisted !== 'object' || persisted === null) return {}
  const record = persisted as Record<string, unknown>
  const valid: Partial<PersistedScenario> = {}
  if (isFiniteNumber(record.investment)) valid.investment = record.investment
  if (isFiniteNumber(record.monthlySpend)) valid.monthlySpend = record.monthlySpend
  if (isWeights(record.weights)) valid.weights = record.weights
  return valid
}

export const useScenarioStore = create<ScenarioStore>()(
  persist(
    (set) => ({
      investment: 60000,
      monthlySpend: 2000,
      weights: weightPresets[0].weights,
      hasSalaryPortability: true,
      ignoreEntryRequirement: true,

      updateScenario: (changes) => set(changes),
    }),
    {
      name: 'cardinal.scenario',
      partialize: ({ investment, monthlySpend, weights }): PersistedScenario => ({
        investment,
        monthlySpend,
        weights,
      }),
      merge: (persisted, current) => ({ ...current, ...readPersistedScenario(persisted) }),
    },
  ),
)

export function useScenario(): Scenario {
  return useScenarioStore(
    useShallow(
      ({ investment, monthlySpend, weights, hasSalaryPortability, ignoreEntryRequirement }) => ({
        investment,
        monthlySpend,
        weights,
        hasSalaryPortability,
        ignoreEntryRequirement,
      }),
    ),
  )
}

export const getUpdateScenario = (state: ScenarioStore) => state.updateScenario
