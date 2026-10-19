import type { Card } from '@cardinal/shared'
import type { AppDatabase } from './client.ts'
import { cardSources, cards as cardsTable, type CardInsert } from './schema.ts'
import { cards as seedCards } from './seed/cards.data.ts'

function toInsert(card: Card, position: number): CardInsert {
  const { sources: _sources, ...columns } = card
  return { ...columns, position }
}

export function seedDatabase(db: AppDatabase, cards: Card[] = seedCards): number {
  db.transaction((tx) => {
    tx.delete(cardSources).run()
    tx.delete(cardsTable).run()
    cards.forEach((card, position) => {
      tx.insert(cardsTable).values(toInsert(card, position)).run()
      const rows = (card.sources ?? []).map((url, index) => ({
        cardId: card.id,
        position: index,
        url,
      }))
      if (rows.length > 0) tx.insert(cardSources).values(rows).run()
    })
  })
  return cards.length
}
