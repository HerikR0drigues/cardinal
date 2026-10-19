import { rankingRequestSchema } from '@cardinal/shared'
import type { Request, Response } from 'express'
import { parseWith } from '../lib/validation.ts'
import type { RankingService } from '../services/ranking.service.ts'

export function createRankingController(service: RankingService) {
  return {
    async rank(request: Request, response: Response) {
      const input = parseWith(rankingRequestSchema, request.body, 'Corpo da requisição')
      response.json(await service.rank(input))
    },
  }
}
