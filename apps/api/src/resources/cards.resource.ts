import { scoreRequestSchema } from '@cardinal/shared'
import type { Request, Response } from 'express'
import { parseWith } from '../lib/validation.ts'
import type { CardsUseCase } from '../usecases/cards.usecase.ts'

// Resource = a porta de entrada HTTP de um assunto (aqui, cartões).
// Ele só: 1) lê o que veio na requisição, 2) valida, 3) chama o usecase, 4) devolve o JSON.
// Nenhuma regra de negócio mora aqui.
export class CardsResource {
  private readonly useCase: CardsUseCase

  constructor(useCase: CardsUseCase) {
    this.useCase = useCase
  }

  // GET /api/cards/:id
  async getById(request: Request<{ id: string }>, response: Response) {
    const card = await this.useCase.getById(request.params.id)
    response.json(card)
  }

  // POST /api/cards/:id/score
  async score(request: Request<{ id: string }>, response: Response) {
    const { scenario } = parseWith(scoreRequestSchema, request.body, 'Corpo da requisição')
    const result = await this.useCase.score(request.params.id, scenario)
    response.json(result)
  }
}
