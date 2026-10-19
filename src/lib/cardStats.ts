import { cards } from '@/data/cards'
import { isSpendOnly } from './fee'

export const TOTAL_CARDS = cards.length
export const SPEND_ONLY_CARDS = cards.filter(isSpendOnly).length
export const INVESTMENT_ROUTE_CARDS = TOTAL_CARDS - SPEND_ONLY_CARDS
