import cors from 'cors'
import express from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import { pinoHttp } from 'pino-http'
import type { Env } from './config/env.ts'
import { createCardsController } from './controllers/cards.controller.ts'
import { createMetaController } from './controllers/meta.controller.ts'
import { createRankingController } from './controllers/ranking.controller.ts'
import type { Logger } from './lib/logger.ts'
import { createErrorHandler, notFoundHandler } from './middleware/error-handler.ts'
import type { CardsRepository } from './repositories/cards.repository.ts'
import { createApiRouter } from './routes/index.ts'
import { CardsService } from './services/cards.service.ts'
import { MetaService } from './services/meta.service.ts'
import { RankingService } from './services/ranking.service.ts'

export interface AppDependencies {
  cardsRepository: CardsRepository
  logger: Logger
  env: Pick<Env, 'CORS_ORIGIN' | 'RATE_LIMIT_PER_MINUTE'>
}

export function createApp({ cardsRepository, logger, env }: AppDependencies) {
  const app = express()
  app.disable('x-powered-by')

  app.use(pinoHttp({ logger }))
  app.use(helmet())
  app.use(cors({ origin: env.CORS_ORIGIN.split(',').map((origin) => origin.trim()) }))
  app.use(express.json({ limit: '100kb' }))
  app.use(
    '/api',
    rateLimit({
      windowMs: 60_000,
      limit: env.RATE_LIMIT_PER_MINUTE,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
      message: { error: { code: 'RATE_LIMITED', message: 'Muitas requisições, tente em instantes' } },
    }),
  )

  app.use(
    '/api',
    createApiRouter({
      cards: createCardsController(new CardsService(cardsRepository)),
      ranking: createRankingController(new RankingService(cardsRepository)),
      meta: createMetaController(new MetaService(cardsRepository)),
    }),
  )

  app.use(notFoundHandler)
  app.use(createErrorHandler(logger))
  return app
}
