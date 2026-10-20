import { useMemo } from 'react'
import type { RankingRequest } from '@/types'
import { getFilters, getSorting, useFiltersStore } from '@/store/filtersStore'
import { useScenario } from '@/store/scenarioStore'
import { useDebouncedValue } from './useDebouncedValue'

const DEBOUNCE_MS = 200

export function useRankingRequest(): RankingRequest {
  const scenario = useScenario()
  const filters = useFiltersStore(getFilters)
  const sorting = useFiltersStore(getSorting)
  const request = useMemo(() => ({ scenario, filters, sorting }), [scenario, filters, sorting])
  return useDebouncedValue(request, DEBOUNCE_MS)
}
