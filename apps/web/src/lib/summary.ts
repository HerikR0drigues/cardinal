import type { Card } from '@/types'
import { formatBrl, formatCompactBrl, formatPercent } from './format'

export interface Fact {
  value: string
  detail?: string
}

const REWARD_PROGRAMS: [string, RegExp][] = [
  ['Livelo', /livelo/i],
  ['Smiles', /smiles/i],
  ['LATAM Pass', /latam pass|multiplus/i],
  ['Azul', /azul/i],
  ['Esfera', /esfera/i],
  ['Iupp', /iupp/i],
  ['Átomos', /[áa]tomos/i],
  ['AAdvantage', /aadvantage/i],
  ['Membership Rewards', /membership rewards/i],
  ['Dotz', /dotz/i],
]

const LOUNGE_PROGRAMS: [string, RegExp][] = [
  ['DragonPass', /dragon ?pass/i],
  ['LoungeKey', /lounge ?key/i],
  ['Priority Pass', /priority pass/i],
  ['Visa Airport Companion', /visa airport companion/i],
]

function detectPrograms(text: string, programs: [string, RegExp][]): string[] {
  return programs.filter(([, pattern]) => pattern.test(text)).map(([name]) => name)
}

function joinOrUndefined(items: string[]): string | undefined {
  return items.length > 0 ? items.join(' · ') : undefined
}

function feeDetail(card: Card): string | undefined {
  if (card.exemptionInvestment !== undefined) {
    return `Zera com ${formatCompactBrl(card.exemptionInvestment)} investidos`
  }
  if (card.halfDiscountInvestment !== undefined) {
    return `50% off com ${formatCompactBrl(card.halfDiscountInvestment)} investidos`
  }
  if (card.fixedAnnualFee !== undefined) return 'Valor fixo, sem isenção'
  if (card.monthlyFeeWithSalary !== undefined) return 'Cai com o investimento'
  if (card.annualFee === 0) return undefined
  return 'Sem isenção por investimento'
}

export function summarizeFee(card: Card): Fact {
  const value = card.annualFee > 0 ? `${formatBrl(card.annualFee)}/ano` : 'Sem anuidade'
  return { value, detail: feeDetail(card) }
}

export function summarizeRewards(
  card: Card,
  rewardsRate: number | null,
  annualRewards: number | null,
): Fact {
  if (rewardsRate === null || annualRewards === null) {
    return { value: 'n/i', detail: 'Não informado' }
  }
  const programs = detectPrograms(card.rewardsText, REWARD_PROGRAMS)
  const detail = joinOrUndefined([
    `~${formatPercent(rewardsRate)} do gasto`,
    ...programs,
    ...(card.rewardsRateTiers ? ['varia com a fatura'] : []),
  ])
  return { value: `~${formatBrl(annualRewards)}/ano`, detail }
}

export function summarizeLounge(card: Card): Fact {
  return {
    value: card.loungeSummary,
    detail:
      card.loungeScore === null
        ? undefined
        : joinOrUndefined(detectPrograms(card.loungeText, LOUNGE_PROGRAMS)),
  }
}

export function summarizeExchange(card: Card): Fact {
  if (card.exchangeSummary) return { value: card.exchangeSummary }
  if (card.exchangeScore === null) return { value: 'n/i', detail: 'Não informado' }
  const cost = Math.max(0, (100 - card.exchangeScore) / 9)
  return { value: `~${formatPercent(cost)}`, detail: 'spread + IOF' }
}
