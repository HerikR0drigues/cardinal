import type { Card, CardSummary } from '@cardinal/shared'

export interface CardsRepository {
  findAll(): Promise<CardSummary[]>
  findById(id: string): Promise<Card | undefined>
}
