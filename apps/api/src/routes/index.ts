import { Router } from 'express'
import type { createCardsController } from '../controllers/cards.controller.ts'
import { health, type createMetaController } from '../controllers/meta.controller.ts'
import type { createRankingController } from '../controllers/ranking.controller.ts'

interface Controllers {
  cards: ReturnType<typeof createCardsController>
  ranking: ReturnType<typeof createRankingController>
  meta: ReturnType<typeof createMetaController>
}

export function createApiRouter({ cards, ranking, meta }: Controllers): Router {
  const router = Router()
  router.get('/health', health)
  router.get('/meta', meta.getMeta)
  router.get('/cards/:id', cards.getById)
  router.post('/cards/:id/score', cards.score)
  router.post('/ranking', ranking.rank)
  return router
}
