import { apiErrorSchema } from '@cardinal/shared'
import type { z } from 'zod'

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

export class ApiError extends Error {
  readonly status: number
  readonly code: string
  readonly details?: unknown

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

interface RequestOptions<Schema extends z.ZodType> {
  schema: Schema
  method?: 'GET' | 'POST'
  body?: unknown
  signal?: AbortSignal
}

export async function request<Schema extends z.ZodType>(
  path: string,
  { schema, method = 'GET', body, signal }: RequestOptions<Schema>,
): Promise<z.output<Schema>> {
  let response: Response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      signal,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new ApiError(
      0,
      'NETWORK_ERROR',
      'Não foi possível falar com o servidor. Verifique a conexão e tente de novo.',
    )
  }

  const payload: unknown = await response.json().catch(() => undefined)

  if (!response.ok) {
    const parsed = apiErrorSchema.safeParse(payload)
    if (parsed.success) {
      const { code, message, details } = parsed.data.error
      throw new ApiError(response.status, code, message, details)
    }
    throw new ApiError(response.status, 'HTTP_ERROR', `O servidor respondeu com erro ${response.status}`)
  }

  const result = schema.safeParse(payload)
  if (!result.success) {
    throw new ApiError(
      response.status,
      'CONTRACT_ERROR',
      'A resposta do servidor não segue o contrato esperado',
      result.error.issues,
    )
  }
  return result.data
}
