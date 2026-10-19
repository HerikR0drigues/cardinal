import { DEFAULT_FILTERS, DEFAULT_SORTING } from '@cardinal/shared'
import { beforeEach, describe, expect, it } from 'vitest'
import { useFiltersStore } from './filtersStore'

describe('filtersStore', () => {
  beforeEach(() => useFiltersStore.getState().resetFilters())

  it('começa com os filtros e a ordenação padrão (todos os cartões, por nota)', () => {
    const { filters, sorting } = useFiltersStore.getState()
    expect(filters).toEqual(DEFAULT_FILTERS)
    expect(filters.includeSpendOnly).toBe(true)
    expect(sorting).toEqual(DEFAULT_SORTING)
  })

  it('setFilters mescla só o que mudou', () => {
    useFiltersStore.getState().setFilters({ group: 'broker', searchText: 'black' })
    expect(useFiltersStore.getState().filters).toEqual({ ...DEFAULT_FILTERS, group: 'broker', searchText: 'black' })
  })

  it('setSorting troca a ordenação sem mexer nos filtros', () => {
    useFiltersStore.getState().setFilters({ loungeOnly: true })
    useFiltersStore.getState().setSorting({ key: 'name', direction: 'asc' })
    const { filters, sorting } = useFiltersStore.getState()
    expect(sorting).toEqual({ key: 'name', direction: 'asc' })
    expect(filters.loungeOnly).toBe(true)
  })

  it('resetFilters volta tudo ao padrão', () => {
    useFiltersStore.getState().setFilters({ group: 'global', includeSpendOnly: false })
    useFiltersStore.getState().setSorting({ key: 'rewards', direction: 'desc' })
    useFiltersStore.getState().resetFilters()
    expect(useFiltersStore.getState().filters).toEqual(DEFAULT_FILTERS)
    expect(useFiltersStore.getState().sorting).toEqual(DEFAULT_SORTING)
  })
})
