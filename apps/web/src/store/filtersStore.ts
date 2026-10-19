import { DEFAULT_FILTERS, DEFAULT_SORTING } from '@cardinal/shared'
import { create } from 'zustand'
import type { Filters, Sorting } from '@/types'

interface FiltersStore {
  filters: Filters
  sorting: Sorting
  setFilters: (changes: Partial<Filters>) => void
  setSorting: (sorting: Sorting) => void
  resetFilters: () => void
}

export const useFiltersStore = create<FiltersStore>()((set) => ({
  filters: DEFAULT_FILTERS,
  sorting: DEFAULT_SORTING,
  setFilters: (changes) => set((state) => ({ filters: { ...state.filters, ...changes } })),
  setSorting: (sorting) => set({ sorting }),
  resetFilters: () => set({ filters: DEFAULT_FILTERS, sorting: DEFAULT_SORTING }),
}))
