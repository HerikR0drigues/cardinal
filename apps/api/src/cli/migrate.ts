import { loadEnv } from '../config/env.ts'
import { createDatabase } from '../db/client.ts'
import { runMigrations } from '../db/migrate.ts'

const { db, sqlite } = createDatabase(loadEnv().DATABASE_PATH)
runMigrations(db)
sqlite.close()
console.log('Migrações aplicadas.')
