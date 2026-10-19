import type { Filters, RankingResponse, Scenario, Sorting } from '@cardinal/shared'
import { rankCards } from '../domain/ranking.ts'
import type { CardsRepository } from '../repositories/cards.repository.ts'

export interface RankingInput {
  scenario: Scenario
  filters: Filters
  sorting: Sorting
}

// UseCase do ranking: busca todos os cartões e pede ao domain para pontuar, filtrar e ordenar.
export class RankingUseCase {
  private readonly repository: CardsRepository

  constructor(repository: CardsRepository) {
    this.repository = repository
  }

  async rank({ scenario, filters, sorting }: RankingInput): Promise<RankingResponse> {
    const cards = await this.repository.findAll()
    const { items, hiddenSpendOnlyCount } = rankCards(cards, scenario, filters, sorting)
    return {
      items: items.map(({ card, result }) => ({ card, result })),
      total: items.length,
      hiddenSpendOnlyCount,
    }
  }
}
