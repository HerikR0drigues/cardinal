import type { Card, Scenario, ScoreResult } from '@cardinal/shared'
import { calculateScore } from '../domain/score.ts'
import { notFound } from '../lib/http-error.ts'
import type { CardsRepository } from '../repositories/cards.repository.ts'

// UseCase = "o que o sistema faz" para um assunto. Orquestra: pede dados ao repository,
// chama as regras puras do domain e decide o resultado (inclusive o erro 404).
// Não conhece HTTP (request/response) nem SQL.
export class CardsUseCase {
  private readonly repository: CardsRepository

  constructor(repository: CardsRepository) {
    this.repository = repository
  }

  async getById(id: string): Promise<Card> {
    const card = await this.repository.findById(id)
    if (!card) throw notFound(`Cartão "${id}" não encontrado`)
    return card
  }

  async score(id: string, scenario: Scenario): Promise<ScoreResult> {
    const card = await this.getById(id)
    return calculateScore(card, scenario)
  }
}
