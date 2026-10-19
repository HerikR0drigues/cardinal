import {
  cardSchema,
  metaSchema,
  rankingResponseSchema,
  scoreResultSchema,
  type RankingRequest,
  type Scenario,
} from '@cardinal/shared'
import { request } from './http'

export const fetchRanking = (body: RankingRequest, signal?: AbortSignal) =>
  request('/ranking', { method: 'POST', body, signal, schema: rankingResponseSchema })

export const fetchCard = (id: string, signal?: AbortSignal) =>
  request(`/cards/${encodeURIComponent(id)}`, { signal, schema: cardSchema })

export const fetchMeta = (signal?: AbortSignal) => request('/meta', { signal, schema: metaSchema })

export const fetchScore = (id: string, scenario: Scenario, signal?: AbortSignal) =>
  request(`/cards/${encodeURIComponent(id)}/score`, {
    method: 'POST',
    body: { scenario },
    signal,
    schema: scoreResultSchema,
  })
