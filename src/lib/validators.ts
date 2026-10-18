import { criteria } from '../data/constants'
import type { Theme, Weights } from '../types'

export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

export function isWeights(value: unknown): value is Weights {
  if (typeof value !== 'object' || value === null) return false
  const record = value as Record<string, unknown>
  return criteria.every((criterion) => isFiniteNumber(record[criterion.key]))
}

export function isThemePreference(value: unknown): value is Theme | null {
  return value === null || value === 'light' || value === 'dark'
}
