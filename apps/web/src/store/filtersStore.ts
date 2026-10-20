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

const initialState = {
  filters: DEFAULT_FILTERS,
  sorting: DEFAULT_SORTING,
}

export const useFiltersStore = create<FiltersStore>()((set) => ({
  ...initialState,

  setFilters: (changes) => set((state) => ({ filters: { ...state.filters, ...changes } })),
  setSorting: (sorting) => set({ sorting }),
  resetFilters: () => set(initialState),
}))

export const getFilters = (state: FiltersStore) => state.filters
export const getSorting = (state: FiltersStore) => state.sorting
export const getSetFilters = (state: FiltersStore) => state.setFilters
export const getSetSorting = (state: FiltersStore) => state.setSorting
