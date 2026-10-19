import type { Request, Response } from 'express'
import type { MetaService } from '../services/meta.service.ts'

export function createMetaController(service: MetaService) {
  return {
    async getMeta(_request: Request, response: Response) {
      response.json(await service.getMeta())
    },
  }
}

export function health(_request: Request, response: Response) {
  response.json({ status: 'ok', uptimeSeconds: Math.round(process.uptime()) })
}
