import cors from 'cors'
import express from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import { pinoHttp } from 'pino-http'
import type { Env } from './config/env.ts'
import type { Logger } from './lib/logger.ts'
import { createErrorHandler, notFoundHandler } from './middleware/error-handler.ts'
import type { CardsRepository } from './repositories/cards.repository.ts'
import { CardsResource } from './resources/cards.resource.ts'
import { MetaResource } from './resources/meta.resource.ts'
import { RankingResource } from './resources/ranking.resource.ts'
import { createApiRouter } from './routes/index.ts'
import { CardsUseCase } from './usecases/cards.usecase.ts'
import { MetaUseCase } from './usecases/meta.usecase.ts'
import { RankingUseCase } from './usecases/ranking.usecase.ts'

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
      // Montagem de baixo para cima: repository → usecase → resource.
      cards: new CardsResource(new CardsUseCase(cardsRepository)),
      ranking: new RankingResource(new RankingUseCase(cardsRepository)),
      meta: new MetaResource(new MetaUseCase(cardsRepository)),
    }),
  )

  app.use(notFoundHandler)
  app.use(createErrorHandler(logger))
  return app
}
