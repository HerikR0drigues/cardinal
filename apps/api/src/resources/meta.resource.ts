import type { Request, Response } from 'express'
import type { MetaUseCase } from '../usecases/meta.usecase.ts'

// Resource das informações gerais da API: contagens e "estou vivo?".
export class MetaResource {
  private readonly useCase: MetaUseCase

  constructor(useCase: MetaUseCase) {
    this.useCase = useCase
  }

  // GET /api/meta
  async getMeta(_request: Request, response: Response) {
    const meta = await this.useCase.getMeta()
    response.json(meta)
  }

  // GET /api/health (não precisa de usecase: não há regra, só um sinal de vida)
  health(_request: Request, response: Response) {
    response.json({ status: 'ok', uptimeSeconds: Math.round(process.uptime()) })
  }
}
