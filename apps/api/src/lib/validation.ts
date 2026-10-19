import type { z } from 'zod'
import { badRequest } from './http-error.ts'

export function parseWith<Schema extends z.ZodType>(
  schema: Schema,
  input: unknown,
  label: string,
): z.output<Schema> {
  const result = schema.safeParse(input)
  if (result.success) return result.data
  const details = result.error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }))
  throw badRequest(`${label} inválido`, details)
}
