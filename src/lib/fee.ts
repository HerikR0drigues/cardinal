import type { Card, FeeResult, Scenario, Tier } from '@/types'
import { formatCompactBrl } from './format'

const MODULE_DISCOUNT_PER_STEP = 10
const MODULE_DISCOUNT_STEP_INVESTMENT = 10_000
const MONTHS_PER_YEAR = 12

function requiresLabel(amount: number): string {
  return `Exige ${formatCompactBrl(amount)}`
}

const exemptFee = (label: string): FeeResult => ({ annualCost: 0, status: 'exempt', label })

function entryRequirementFee(card: Card, scenario: Scenario): FeeResult | null {
  if (
    card.entryRequirement === undefined ||
    scenario.ignoreEntryRequirement ||
    scenario.investment >= card.entryRequirement
  ) {
    return null
  }
  return {
    annualCost: null,
    status: 'unreachable',
    label: card.entryRequirementLabel ?? requiresLabel(card.entryRequirement),
  }
}

function monthlyModuleFee(card: Card, scenario: Scenario): FeeResult | null {
  if (card.monthlyFeeWithSalary === undefined) return null

  const monthlyBase = scenario.hasSalaryPortability
    ? card.monthlyFeeWithSalary
    : card.monthlyFeeWithoutSalary || card.monthlyFeeWithSalary
  const discount =
    MODULE_DISCOUNT_PER_STEP * Math.floor(scenario.investment / MODULE_DISCOUNT_STEP_INVESTMENT)
  const monthly = Math.max(0, monthlyBase - discount)
  const annualCost = monthly * MONTHS_PER_YEAR

  if (annualCost <= 0) return exemptFee('Isenta')
  return { annualCost, status: 'partial', label: `R$ ${monthly}/mês` }
}

function fixedAnnualFee(card: Card): FeeResult | null {
  if (card.fixedAnnualFee === undefined) return null
  return {
    annualCost: card.fixedAnnualFee,
    status: card.fixedAnnualFee > 0 ? 'partial' : 'exempt',
    label: card.feeLabelOutOfReach ?? 'Valor fixo',
  }
}

function investmentGateFee(card: Card, investment: number): FeeResult | null {
  if (!card.requiresInvestmentToIssue) return null

  const required = card.exemptionInvestment
  if (required !== undefined && investment >= required) return exemptFee('Isenta')

  return {
    annualCost: null,
    status: 'unreachable',
    label:
      card.feeLabelOutOfReach ??
      (required !== undefined ? requiresLabel(required) : 'Fora do alcance'),
  }
}

function investmentExemptionFee(card: Card, investment: number): FeeResult | null {
  if (card.annualFee === 0) return exemptFee('Sem anuidade')

  if (card.exemptionInvestment !== undefined && investment >= card.exemptionInvestment) {
    if (card.isFeeUncertain) {
      return { annualCost: card.annualFee / 2, status: 'partial', label: 'Incerta' }
    }
    return exemptFee('Isenta')
  }

  if (card.halfDiscountInvestment !== undefined && investment >= card.halfDiscountInvestment) {
    return { annualCost: card.annualFee / 2, status: 'partial', label: '50% de desconto' }
  }

  return null
}

function outOfReachFee(card: Card): FeeResult {
  const required = card.exemptionInvestment
  return {
    annualCost: card.annualFee,
    status: 'unreachable',
    label:
      card.feeLabelOutOfReach ?? (required !== undefined ? requiresLabel(required) : 'Só por gasto'),
  }
}

function calculateBaseFee(card: Card, scenario: Scenario): FeeResult {
  return (
    entryRequirementFee(card, scenario) ??
    monthlyModuleFee(card, scenario) ??
    fixedAnnualFee(card) ??
    investmentGateFee(card, scenario.investment) ??
    investmentExemptionFee(card, scenario.investment) ??
    outOfReachFee(card)
  )
}

export function calculateFee(card: Card, scenario: Scenario): FeeResult {
  const baseFee = calculateBaseFee(card, scenario)
  const blockedByInvestmentGate =
    card.requiresInvestmentToIssue &&
    card.exemptionInvestment !== undefined &&
    scenario.investment < card.exemptionInvestment

  if (
    baseFee.status !== 'exempt' &&
    scenario.hasSalaryPortability &&
    card.acceptsSalaryPortability &&
    !blockedByInvestmentGate
  ) {
    return exemptFee('Isenta (salário)')
  }
  return baseFee
}

export function pickTierValue(
  tiers: Tier | undefined,
  amount: number,
  fallback: number | null,
): number | null {
  if (!tiers) return fallback
  let value = tiers[0][1]
  for (const [minimum, tierValue] of tiers) {
    if (amount >= minimum) value = tierValue
  }
  return value
}

export function isSpendOnly(card: Card): boolean {
  return (
    card.fixedAnnualFee === undefined &&
    card.monthlyFeeWithSalary === undefined &&
    !card.requiresInvestmentToIssue &&
    card.annualFee > 0 &&
    card.exemptionInvestment === undefined &&
    card.halfDiscountInvestment === undefined
  )
}
