import { z } from 'zod'
import { LIMITS } from '../constants.ts'

const weightSchema = z.number().finite().min(0).max(LIMITS.maxWeight)

export const weightsSchema = z.object({
  annualFee: weightSchema,
  rewards: weightSchema,
  loungeAccess: weightSchema,
  exchangeRate: weightSchema,
})

export const scenarioSchema = z.object({
  investment: z.number().finite().min(0).max(LIMITS.maxInvestment),
  monthlySpend: z.number().finite().min(0).max(LIMITS.maxMonthlySpend),
  weights: weightsSchema,
  hasSalaryPortability: z.boolean(),
  ignoreEntryRequirement: z.boolean(),
})

export type Weights = z.infer<typeof weightsSchema>
export type Scenario = z.infer<typeof scenarioSchema>
