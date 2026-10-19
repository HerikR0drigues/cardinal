import type { Card, Scenario, ScoreResult } from '@cardinal/shared'
import { calculateScore } from '../domain/score.ts'
import { notFound } from '../lib/http-error.ts'
import type { CardsRepository } from '../repositories/cards.repository.ts'

export class CardsService {
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
    return calculateScore(await this.getById(id), scenario)
  }
}
