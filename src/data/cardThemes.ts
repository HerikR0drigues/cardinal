import type { Card, Group } from '@/types'

export interface CardTheme {
  from: string
  to: string
  ink: string
}

const LIGHT_INK = '#ffffff'

const themeByIssuer: Record<string, CardTheme> = {
  'BTG Pactual': { from: '#14315c', to: '#071426', ink: LIGHT_INK },
  XP: { from: '#505050', to: '#0a0a0a', ink: LIGHT_INK },
  Rico: { from: '#ff8a3d', to: '#e04b00', ink: LIGHT_INK },
  Genial: { from: '#2f7cf6', to: '#0a2766', ink: LIGHT_INK },
  Safra: { from: '#1a4a7a', to: '#07213b', ink: LIGHT_INK },
  'Ágora (Bradesco)': { from: '#c4162e', to: '#4a0612', ink: LIGHT_INK },
  'Porto Bank': { from: '#1a7ae0', to: '#052f63', ink: LIGHT_INK },
  Itaú: { from: '#ff8a1f', to: '#7a2e00', ink: LIGHT_INK },
  Bradesco: { from: '#e0183a', to: '#650016', ink: LIGHT_INK },
  'Bradesco ou Santander': { from: '#4a6fb0', to: '#142447', ink: LIGHT_INK },
  Santander: { from: '#f01616', to: '#7a0000', ink: LIGHT_INK },
  'Banco do Brasil': { from: '#fff04a', to: '#f0b400', ink: '#0a2a6b' },
  Caixa: { from: '#1a7ac4', to: '#00294d', ink: LIGHT_INK },
  Sicredi: { from: '#56bd49', to: '#145a1f', ink: LIGHT_INK },
  Sicoob: { from: '#0a9a94', to: '#02302f', ink: LIGHT_INK },
  Banrisul: { from: '#1a64b8', to: '#00204a', ink: LIGHT_INK },
  BRB: { from: '#2250c8', to: '#08184f', ink: LIGHT_INK },
  Nubank: { from: '#9a2ee6', to: '#3d0a78', ink: LIGHT_INK },
  'C6 Bank': { from: '#4a4a4a', to: '#0d0d0d', ink: LIGHT_INK },
  Inter: { from: '#ff8a1f', to: '#c43c00', ink: LIGHT_INK },
  PicPay: { from: '#2ad468', to: '#07612b', ink: LIGHT_INK },
  'Mercado Pago': { from: '#27bdf0', to: '#0060a8', ink: LIGHT_INK },
  Nomad: { from: '#2e2e2e', to: '#070707', ink: '#ffd86b' },
  'ARQ (ex-DolarApp)': { from: '#5a5aff', to: '#14146e', ink: LIGHT_INK },
  Revolut: { from: '#1c4fe0', to: '#0a0d24', ink: LIGHT_INK },
  'Contas globais': { from: '#475569', to: '#0f172a', ink: LIGHT_INK },
}

const themeByGroup: Record<Group, CardTheme> = {
  broker: { from: '#3b3b3b', to: '#0a0a0a', ink: LIGHT_INK },
  traditionalBank: { from: '#1a4a7a', to: '#07213b', ink: LIGHT_INK },
  digitalBank: { from: '#7a3be0', to: '#24087a', ink: LIGHT_INK },
  global: { from: '#475569', to: '#0f172a', ink: LIGHT_INK },
}

export function getCardTheme(card: Card): CardTheme {
  return themeByIssuer[card.issuer] ?? themeByGroup[card.group]
}
