import type { ErrorRequestHandler, RequestHandler } from 'express'
import { HttpError } from '../lib/http-error.ts'
import type { Logger } from '../lib/logger.ts'

export const notFoundHandler: RequestHandler = (request, _response, next) => {
  next(new HttpError(404, 'NOT_FOUND', `Rota ${request.method} ${request.path} não existe`))
}

export function createErrorHandler(logger: Logger): ErrorRequestHandler {
  return (error, _request, response, next) => {
    if (response.headersSent) return next(error)

    if (error instanceof HttpError) {
      response.status(error.status).json({
        error: { code: error.code, message: error.message, details: error.details },
      })
      return
    }

    const status = typeof error?.status === 'number' ? error.status : undefined
    if (status === 400 && error?.type === 'entity.parse.failed') {
      response.status(400).json({ error: { code: 'INVALID_JSON', message: 'JSON inválido' } })
      return
    }
    if (status === 413) {
      response
        .status(413)
        .json({ error: { code: 'PAYLOAD_TOO_LARGE', message: 'Corpo da requisição grande demais' } })
      return
    }

    logger.error({ err: error }, 'erro não tratado')
    response
      .status(500)
      .json({ error: { code: 'INTERNAL_ERROR', message: 'Erro interno do servidor' } })
  }
}
