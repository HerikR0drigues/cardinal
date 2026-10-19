import { z } from 'zod'

export const metaSchema = z.object({
  totalCards: z.number().int().min(0),
  spendOnlyCards: z.number().int().min(0),
  investmentRouteCards: z.number().int().min(0),
})

export const healthSchema = z.object({
  status: z.literal('ok'),
  uptimeSeconds: z.number().min(0),
})

export const apiErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
  }),
})

export type Meta = z.infer<typeof metaSchema>
export type Health = z.infer<typeof healthSchema>
export type ApiError = z.infer<typeof apiErrorSchema>
