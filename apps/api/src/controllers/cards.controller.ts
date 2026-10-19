import { scoreRequestSchema } from '@cardinal/shared'
import type { Request, Response } from 'express'
import { parseWith } from '../lib/validation.ts'
import type { CardsService } from '../services/cards.service.ts'

export function createCardsController(service: CardsService) {
  return {
    async getById(request: Request<{ id: string }>, response: Response) {
      response.json(await service.getById(request.params.id))
    },

    async score(request: Request<{ id: string }>, response: Response) {
      const { scenario } = parseWith(scoreRequestSchema, request.body, 'Corpo da requisição')
      response.json(await service.score(request.params.id, scenario))
    },
  }
}
