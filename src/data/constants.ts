import type {
  Confidence,
  Criterion,
  FeeStatusOption,
  Group,
  GroupOption,
  SortOption,
  WeightPreset,
} from '../types'

export const criteria: Criterion[] = [
  { key: 'annualFee', label: 'Anuidade', color: 'var(--criterion-fee)' },
  { key: 'rewards', label: 'Retorno', color: 'var(--criterion-rewards)' },
  { key: 'loungeAccess', label: 'Salas VIP', color: 'var(--criterion-lounge)' },
  { key: 'exchangeRate', label: 'Câmbio', color: 'var(--criterion-exchange)' },
]

export const weightPresets: WeightPreset[] = [
  { name: 'Padrão', weights: { annualFee: 40, rewards: 25, loungeAccess: 25, exchangeRate: 10 } },
  { name: 'Anuidade zero', weights: { annualFee: 65, rewards: 15, loungeAccess: 10, exchangeRate: 10 } },
  { name: 'Viajante', weights: { annualFee: 20, rewards: 15, loungeAccess: 40, exchangeRate: 25 } },
  { name: 'Retorno', weights: { annualFee: 20, rewards: 55, loungeAccess: 15, exchangeRate: 10 } },
]

export const investmentPresets: number[] = [20000, 50000, 60000, 100000, 250000]

export const groupOptions: GroupOption[] = [
  { value: 'all', label: 'Todas' },
  { value: 'broker', label: 'Corretoras' },
  { value: 'traditionalBank', label: 'Bancos' },
  { value: 'digitalBank', label: 'Digitais' },
  { value: 'global', label: 'Global' },
]

export const feeStatusOptions: FeeStatusOption[] = [
  { value: 'all', label: 'Todas' },
  { value: 'exempt', label: 'Isentas' },
  { value: 'partial', label: 'Parciais' },
  { value: 'unreachable', label: 'Fora do alcance' },
]

export const groupNames: Record<Group, string> = {
  broker: 'Corretora',
  traditionalBank: 'Banco tradicional',
  digitalBank: 'Banco digital',
  global: 'Global',
}

export const sortOptions: SortOption[] = [
  { value: 'score', label: 'Nota' },
  { value: 'name', label: 'Nome' },
  { value: 'annualCost', label: 'Anuidade com o seu aporte' },
  { value: 'annualFee', label: 'Anuidade cheia' },
  { value: 'rewards', label: 'Retorno' },
  { value: 'lounge', label: 'Salas VIP' },
  { value: 'exchange', label: 'Câmbio' },
  { value: 'confidence', label: 'Confiança' },
]

export const confidenceLabels: Record<Confidence, string> = {
  high: 'Confiança alta',
  medium: 'Confiança média',
  low: 'Confiança baixa',
}
