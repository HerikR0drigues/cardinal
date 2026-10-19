import type { Meta } from '@cardinal/shared'
import { isSpendOnly } from '../domain/fee.ts'
import type { CardsRepository } from '../repositories/cards.repository.ts'

// UseCase das contagens gerais: busca os cartões e conta quantos zeram a anuidade só por gasto.
export class MetaUseCase {
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
