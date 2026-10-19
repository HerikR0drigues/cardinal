import { Router } from 'express'
import type { CardsResource } from '../resources/cards.resource.ts'
import type { MetaResource } from '../resources/meta.resource.ts'
import type { RankingResource } from '../resources/ranking.resource.ts'

interface Resources {
  cards: CardsResource
  ranking: RankingResource
  meta: MetaResource
}

// Routes = o mapa "URL + verbo → método do resource". Nenhuma lógica aqui.
// As setas (request, response) => ... garantem que o método rode ligado ao seu resource.
export function createApiRouter({ cards, ranking, meta }: Resources): Router {
  const router = Router()

  router.get('/health', (request, response) => meta.health(request, response))
  router.get('/meta', (request, response) => meta.getMeta(request, response))
  router.get('/cards/:id', (request, response) => cards.getById(request, response))
  router.post('/cards/:id/score', (request, response) => cards.score(request, response))
  router.post('/ranking', (request, response) => ranking.rank(request, response))

  return router
}
