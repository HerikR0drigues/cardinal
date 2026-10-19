import type { Card, CardSummary } from '@cardinal/shared'

// Repository = o único lugar que sabe de onde os dados vêm (hoje SQLite, em sqlite-cards.repository.ts).
// Os usecases dependem desta interface, não do banco: trocar o banco não mexe neles.
export interface CardsRepository {
  findAll(): Promise<CardSummary[]>
  findById(id: string): Promise<Card | undefined>
}
