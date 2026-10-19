import { loadEnv } from '../config/env.ts'
import { createDatabase } from '../db/client.ts'
import { runMigrations } from '../db/migrate.ts'
import { seedDatabase } from '../db/seed.ts'

const { db, sqlite } = createDatabase(loadEnv().DATABASE_PATH)
runMigrations(db)
console.log(`Seed concluído: ${seedDatabase(db)} cartões.`)
sqlite.close()
