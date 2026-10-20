import { DEFAULT_FILTERS, DEFAULT_SORTING } from '@cardinal/shared'
import { create } from 'zustand'
import type { Filters, Sorting } from '@/types'

// Store dos filtros e da ordenação da lista. Lê-se de cima para baixo, como um módulo Vuex:
// TIPO → STATE → STORE (com as ACTIONS) → GETTERS.

// ─── TIPO ────────────────────────────────────────────────────────────────────
// Só descreve o que a store tem (para o TypeScript ajudar). Não existe quando o app roda.
interface FiltersStore {
  // dados
  filters: Filters
  sorting: Sorting
  // actions
  setFilters: (changes: Partial<Filters>) => void
  setSorting: (sorting: Sorting) => void
  resetFilters: () => void
}

// ─── STATE ───────────────────────────────────────────────────────────────────
// Valores iniciais (vêm do pacote shared, o mesmo padrão que a API usa).
const initialState = {
  filters: DEFAULT_FILTERS,
  sorting: DEFAULT_SORTING,
}

// ─── STORE ───────────────────────────────────────────────────────────────────
// `create` cria a store e devolve um hook (useFiltersStore).
// `set` é o que muda o estado (o commit do Vuex). Nunca se altera o estado direto:
// cada mudança entrega um objeto novo, e é assim que o React percebe que algo mudou.
export const useFiltersStore = create<FiltersStore>()((set) => ({
  ...initialState,

  // ACTIONS
  // `filters` é um objeto com vários campos, então copiamos os atuais (...state.filters)
  // e sobrescrevemos só o que veio em `changes`. Ex.: setFilters({ group: 'bank' }).
  setFilters: (changes) => set((state) => ({ filters: { ...state.filters, ...changes } })),
  setSorting: (sorting) => set({ sorting }),
  resetFilters: () => set(initialState),
}))

// ─── GETTERS ─────────────────────────────────────────────────────────────────
// Cada getter escolhe um pedaço da store. O componente usa assim:
//   const filters = useFiltersStore(getFilters)
// e só se redesenha quando aquele pedaço muda.
export const getFilters = (state: FiltersStore) => state.filters
export const getSorting = (state: FiltersStore) => state.sorting
export const getSetFilters = (state: FiltersStore) => state.setFilters
export const getSetSorting = (state: FiltersStore) => state.setSorting
