import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import type { AppDatabase } from './client.ts'

function findMigrationsFolder(): string {
  const candidates = [
    resolve(import.meta.dirname, '../../drizzle'),
    resolve(import.meta.dirname, '../drizzle'),
  ]
  const folder = candidates.find((candidate) => existsSync(candidate))
  if (!folder) throw new Error(`Pasta de migrações não encontrada. Procurei em: ${candidates.join(', ')}`)
  return folder
}

export function runMigrations(db: AppDatabase): void {
  migrate(db, { migrationsFolder: findMigrationsFolder() })
}
