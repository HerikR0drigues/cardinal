import type { Card, CardSummary } from '@cardinal/shared'
import { asc, eq } from 'drizzle-orm'
import type { AppDatabase } from '../db/client.ts'
import { cardSources, cards, type CardRow } from '../db/schema.ts'
import type { CardsRepository } from './cards.repository.ts'

const NULLABLE_COLUMNS = new Set(['rewardsRate', 'loungeScore', 'exchangeScore'])

function rowToSummary(row: CardRow): CardSummary {
  const { position: _position, ...columns } = row
  const summary: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(columns)) {
    if (value === null && !NULLABLE_COLUMNS.has(key)) continue
    summary[key] = value
  }
  return summary as CardSummary
}

export class SqliteCardsRepository implements CardsRepository {
  private readonly db: AppDatabase

  constructor(db: AppDatabase) {
    this.db = db
  }

  async findAll(): Promise<CardSummary[]> {
    const rows = this.db.select().from(cards).orderBy(asc(cards.position)).all()
    return rows.map(rowToSummary)
  }

  async findById(id: string): Promise<Card | undefined> {
    const row = this.db.select().from(cards).where(eq(cards.id, id)).get()
    if (!row) return undefined
    const sources = this.db
      .select({ url: cardSources.url })
      .from(cardSources)
      .where(eq(cardSources.cardId, id))
      .orderBy(asc(cardSources.position))
      .all()
      .map((source) => source.url)
    const summary = rowToSummary(row)
    return sources.length > 0 ? { ...summary, sources } : summary
  }
}
