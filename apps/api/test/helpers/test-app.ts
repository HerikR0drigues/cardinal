import { createApp } from '../../src/app.ts'
import { createDatabase } from '../../src/db/client.ts'
import { runMigrations } from '../../src/db/migrate.ts'
import { seedDatabase } from '../../src/db/seed.ts'
import { createLogger } from '../../src/lib/logger.ts'
import { SqliteCardsRepository } from '../../src/repositories/sqlite-cards.repository.ts'

export function createTestDatabase() {
  const { db, sqlite } = createDatabase(':memory:')
  runMigrations(db)
  seedDatabase(db)
  return { db, sqlite }
}

export function createTestApp(overrides: { rateLimit?: number } = {}) {
  const { db, sqlite } = createTestDatabase()
  const app = createApp({
    cardsRepository: new SqliteCardsRepository(db),
    logger: createLogger({ NODE_ENV: 'test', LOG_LEVEL: 'silent' }),
    env: {
      CORS_ORIGIN: 'http://localhost:5173',
      RATE_LIMIT_PER_MINUTE: overrides.rateLimit ?? 100_000,
    },
  })
  return { app, db, sqlite }
}
