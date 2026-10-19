import { z } from 'zod'
import { CONFIDENCES, GROUPS } from '../constants.ts'

const tierSchema = z.array(z.tuple([z.number(), z.number()]))

export const cardSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  issuer: z.string().min(1),
  network: z.string(),
  group: z.enum(GROUPS),
  annualFee: z.number().min(0),
  feeRule: z.string(),
  rewardsText: z.string(),
  rewardsRate: z.number().nullable(),
  loungeText: z.string(),
  loungeSummary: z.string(),
  loungeScore: z.number().nullable(),
  exchangeText: z.string(),
  exchangeScore: z.number().nullable(),
  confidence: z.enum(CONFIDENCES),
  exchangeSummary: z.string().optional(),
  notes: z.string().optional(),
  exemptionInvestment: z.number().optional(),
  halfDiscountInvestment: z.number().optional(),
  requiresInvestmentToIssue: z.boolean().optional(),
  caveat: z.string().optional(),
  rewardsRateTiers: tierSchema.optional(),
  loungeScoreTiers: tierSchema.optional(),
  loungeSummaryLow: z.string().optional(),
  fixedAnnualFee: z.number().optional(),
  monthlyFeeWithSalary: z.number().optional(),
  monthlyFeeWithoutSalary: z.number().optional(),
  entryRequirement: z.number().optional(),
  entryRequirementLabel: z.string().optional(),
  feeLabelOutOfReach: z.string().optional(),
  statusTag: z.string().optional(),
  isReference: z.boolean().optional(),
  acceptsSalaryPortability: z.boolean().optional(),
  isFeeUncertain: z.boolean().optional(),
  sourcesDisagree: z.boolean().optional(),
  sources: z.array(z.string()).optional(),
})

export const cardSummarySchema = cardSchema.omit({ sources: true })

export type Card = z.infer<typeof cardSchema>
export type CardSummary = z.infer<typeof cardSummarySchema>
export type Tier = z.infer<typeof tierSchema>
