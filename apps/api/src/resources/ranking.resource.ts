import { rankingRequestSchema } from '@cardinal/shared'
import type { Request, Response } from 'express'
import { parseWith } from '../lib/validation.ts'
import type { RankingUseCase } from '../usecases/ranking.usecase.ts'

// Resource do ranking: valida o corpo e entrega ao usecase.
export class RankingResource {
  private readonly useCase: RankingUseCase

  constructor(useCase: RankingUseCase) {
    this.useCase = useCase
  }

  // POST /api/ranking
  async rank(request: Request, response: Response) {
    const input = parseWith(rankingRequestSchema, request.body, 'Corpo da requisição')
    const ranking = await this.useCase.rank(input)
    response.json(ranking)
  }
}
