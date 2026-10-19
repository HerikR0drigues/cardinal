import { loadEnv } from './config/env.ts'
import { createApp } from './app.ts'
import { createDatabase } from './db/client.ts'
import { runMigrations } from './db/migrate.ts'
import { seedDatabase } from './db/seed.ts'
import { cards } from './db/schema.ts'
import { createLogger } from './lib/logger.ts'
import { SqliteCardsRepository } from './repositories/sqlite-cards.repository.ts'

const env = loadEnv()
const logger = createLogger(env)
const { db, sqlite } = createDatabase(env.DATABASE_PATH)

runMigrations(db)
if (env.SEED_ON_START && db.select().from(cards).limit(1).all().length === 0) {
  logger.info(`banco vazio: seed de ${seedDatabase(db)} cartões`)
}

const app = createApp({ cardsRepository: new SqliteCardsRepository(db), logger, env })
const server = app.listen(env.PORT, () => {
  logger.info(`API em http://localhost:${env.PORT} (banco: ${env.DATABASE_PATH})`)
})

function shutdown(signal: string) {
  logger.info(`${signal} recebido, encerrando`)
  server.close(() => {
    sqlite.close()
    process.exit(0)
  })
}
process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
