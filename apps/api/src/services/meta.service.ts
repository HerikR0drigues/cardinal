import type { Meta } from '@cardinal/shared'
import { isSpendOnly } from '../domain/fee.ts'
import type { CardsRepository } from '../repositories/cards.repository.ts'

export class MetaService {
  private readonly repository: CardsRepository

  constructor(repository: CardsRepository) {
    this.repository = repository
  }

  async getMeta(): Promise<Meta> {
    const cards = await this.repository.findAll()
    const spendOnlyCards = cards.filter(isSpendOnly).length
    return {
      totalCards: cards.length,
      spendOnlyCards,
      investmentRouteCards: cards.length - spendOnlyCards,
    }
  }
}
