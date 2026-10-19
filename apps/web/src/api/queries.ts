import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'
import type { RankingRequest, Scenario } from '@cardinal/shared'
import { fetchCard, fetchMeta, fetchRanking, fetchScore } from './endpoints'

const FIVE_MINUTES_MS = 5 * 60_000

export const queryKeys = {
  ranking: (request: RankingRequest) => ['ranking', request] as const,
  card: (id: string) => ['card', id] as const,
  meta: ['meta'] as const,
  score: (id: string, scenario: Scenario) => ['score', id, scenario] as const,
}

export function useRankingQuery(request: RankingRequest) {
  return useQuery({
    queryKey: queryKeys.ranking(request),
    queryFn: ({ signal }) => fetchRanking(request, signal),
    placeholderData: keepPreviousData,
  })
}

export function useCardQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.card(id),
    queryFn: ({ signal }) => fetchCard(id, signal),
    staleTime: FIVE_MINUTES_MS,
  })
}

export function useMetaQuery() {
  return useQuery({
    queryKey: queryKeys.meta,
    queryFn: ({ signal }) => fetchMeta(signal),
    staleTime: FIVE_MINUTES_MS,
  })
}

export function useScoreQuery(id: string, scenario: Scenario) {
  return useQuery({
    queryKey: queryKeys.score(id, scenario),
    queryFn: ({ signal }) => fetchScore(id, scenario, signal),
    placeholderData: keepPreviousData,
  })
}

export function usePrefetchCard() {
  const client = useQueryClient()
  return (id: string) =>
    client.prefetchQuery({
      queryKey: queryKeys.card(id),
      queryFn: ({ signal }) => fetchCard(id, signal),
      staleTime: FIVE_MINUTES_MS,
    })
}
