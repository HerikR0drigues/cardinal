import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'
import { weightPresets } from '@/data/constants'
import { isFiniteNumber, isWeights } from '@/lib/validators'
import type { Scenario } from '@/types'

// Store do cenário (quanto investe, quanto gasta, pesos). Diferente dos filtros, é SALVA no navegador.
// Ordem do arquivo: TIPOS → LEITURA DO QUE FOI SALVO → STORE (state + actions + persistência) → GETTERS.

// ─── TIPOS ───────────────────────────────────────────────────────────────────
// O que vai para o localStorage: só estes 3 campos do cenário.
type PersistedScenario = Pick<Scenario, 'investment' | 'monthlySpend' | 'weights'>

// A store tem todos os campos do cenário soltos na raiz (state.investment, state.weights...)
// mais a action updateScenario.
interface ScenarioStore extends Scenario {
  updateScenario: (changes: Partial<Scenario>) => void
}

// ─── LEITURA DO QUE FOI SALVO ────────────────────────────────────────────────
// O localStorage pode ter qualquer coisa (versão antiga do app, edição manual).
// Por isso a entrada é `unknown` e só aproveitamos os campos que passam na conferência;
// o resto fica com o valor padrão.
function readPersistedScenario(persisted: unknown): Partial<PersistedScenario> {
  if (typeof persisted !== 'object' || persisted === null) return {}
  const record = persisted as Record<string, unknown>
  const valid: Partial<PersistedScenario> = {}
  if (isFiniteNumber(record.investment)) valid.investment = record.investment
  if (isFiniteNumber(record.monthlySpend)) valid.monthlySpend = record.monthlySpend
  if (isWeights(record.weights)) valid.weights = record.weights
  return valid
}

// ─── STORE ───────────────────────────────────────────────────────────────────
// `persist` embrulha a store e salva/restaura sozinho no localStorage.
// Opções: `name` é a chave salva; `partialize` escolhe o que salvar;
// `merge` junta o que foi salvo (já conferido) com os valores iniciais.
export const useScenarioStore = create<ScenarioStore>()(
  persist(
    (set) => ({
      // STATE (valores iniciais)
      investment: 60000,
      monthlySpend: 2000,
      weights: weightPresets[0].weights,
      hasSalaryPortability: true,
      ignoreEntryRequirement: true,

      // ACTIONS
      // Os campos estão na raiz, então o set já mescla sozinho: updateScenario({ investment: 80000 }).
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

// ─── GETTERS ─────────────────────────────────────────────────────────────────
// getScenario devolve os 5 campos como um objeto só (o formato que a API espera).
// Como o objeto é novo a cada chamada, o useShallow compara campo a campo e só
// avisa o componente quando algum valor mudou (sem isso entraria em loop de render).
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

// Getter da action, para o componente escrever: useScenarioStore(getUpdateScenario)
export const getUpdateScenario = (state: ScenarioStore) => state.updateScenario
