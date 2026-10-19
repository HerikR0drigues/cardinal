export function formatBrl(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  })
}

export function formatCompactBrl(value: number): string {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toLocaleString('pt-BR')} mi`
  if (value >= 10_000) return `R$ ${Math.round(value / 1000)} mil`
  return formatBrl(value)
}
