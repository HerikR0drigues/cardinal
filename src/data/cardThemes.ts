import { contrastRatio, hashText, mix, readableInk } from '@/lib/color'
import type { Card, Group } from '@/types'

export type CardFinish = 'gloss' | 'matte' | 'metal' | 'chrome' | 'carbon'
export type CardPattern = 'none' | 'lines' | 'diagonal' | 'dots' | 'grid' | 'waves'
export type CardChip = 'gold' | 'silver' | 'dark'

export interface CardTheme {
  from: string
  to: string
  ink: string
  accent: string
  base: string
  finish: CardFinish
  pattern: CardPattern
  chip: CardChip
}

interface Brand {
  from: string
  to: string
}

type Tier =
  | 'standard'
  | 'platinum'
  | 'gold'
  | 'green'
  | 'black'
  | 'elite'
  | 'legend'
  | 'nanquim'
  | 'grafite'
  | 'diners'
  | 'centurion'

const LIGHT_INK = '#ffffff'
const MIN_ACCENT_CONTRAST = 3
const MIN_INK_CONTRAST = 4
const MAX_FIT_STEPS = 10
const FIT_STEP = 0.1
const GOLD_ACCENT = '#d8b765'
const PATTERNS: CardPattern[] = ['lines', 'diagonal', 'dots', 'grid', 'waves']

const brandByIssuer: Record<string, Brand> = {
  'BTG Pactual': { from: '#14315c', to: '#071426' },
  XP: { from: '#505050', to: '#0a0a0a' },
  Rico: { from: '#ff8a3d', to: '#e04b00' },
  Genial: { from: '#2f7cf6', to: '#0a2766' },
  Safra: { from: '#1a4a7a', to: '#07213b' },
  'Ágora (Bradesco)': { from: '#c4162e', to: '#4a0612' },
  'Porto Bank': { from: '#1a7ae0', to: '#052f63' },
  Itaú: { from: '#ff8a1f', to: '#7a2e00' },
  Bradesco: { from: '#e0183a', to: '#650016' },
  'Bradesco ou Santander': { from: '#4a6fb0', to: '#142447' },
  Santander: { from: '#f01616', to: '#7a0000' },
  'Banco do Brasil': { from: '#fff04a', to: '#f0b400' },
  Caixa: { from: '#1a7ac4', to: '#00294d' },
  Sicredi: { from: '#56bd49', to: '#145a1f' },
  Sicoob: { from: '#0a9a94', to: '#02302f' },
  Banrisul: { from: '#1a64b8', to: '#00204a' },
  BRB: { from: '#2250c8', to: '#08184f' },
  Banestes: { from: '#1f8fd6', to: '#06304f' },
  Nubank: { from: '#9a2ee6', to: '#3d0a78' },
  'C6 Bank': { from: '#4a4a4a', to: '#0d0d0d' },
  Inter: { from: '#ff8a1f', to: '#c43c00' },
  PicPay: { from: '#2ad468', to: '#07612b' },
  'Mercado Pago': { from: '#27bdf0', to: '#0060a8' },
  Nomad: { from: '#2e2e2e', to: '#070707' },
  'ARQ (ex-DolarApp)': { from: '#5a5aff', to: '#14146e' },
  Revolut: { from: '#1c4fe0', to: '#0a0d24' },
  'Contas globais': { from: '#475569', to: '#0f172a' },
}

const brandByGroup: Record<Group, Brand> = {
  broker: { from: '#3b3b3b', to: '#0a0a0a' },
  traditionalBank: { from: '#1a4a7a', to: '#07213b' },
  digitalBank: { from: '#7a3be0', to: '#24087a' },
  global: { from: '#475569', to: '#0f172a' },
}

const brandByProductLine: [RegExp, Brand][] = [
  [/\bazul\b/, { from: '#1f6fe0', to: '#06245c' }],
  [/\blatam\b/, { from: '#d4185a', to: '#4a0620' }],
  [/smiles|\bgol\b/, { from: '#ff8a1a', to: '#8a3300' }],
  [/livelo/, { from: '#ff2d9b', to: '#5a0a3a' }],
  [/disney/, { from: '#1c4fc4', to: '#07123a' }],
  [/marriott/, { from: '#a3264a', to: '#2c0716' }],
  [/united/, { from: '#1555b8', to: '#041a3d' }],
  [/horizon/, { from: '#6b2fa0', to: '#14083a' }],
  [/\btap\b/, { from: '#d3112d', to: '#14201a' }],
  [/pao de acucar/, { from: '#2a9d57', to: '#0a3d20' }],
  [/aadvantage/, { from: '#3d7ab8', to: '#0b1d33' }],
]

const tierRules: [RegExp, Tier][] = [
  [/centurion/, 'centurion'],
  [/legend/, 'legend'],
  [/nanquim/, 'nanquim'],
  [/grafite/, 'grafite'],
  [/diners/, 'diners'],
  [
    /private|privilege|personnalit|aeternum|iridium|ultrablue|partners|zenith|altus|absoluto|icone|legacy|unique|unlimited|exclusive|the one/,
    'elite',
  ],
  [/black|infinite|signature|world elite|carbon|\bwin\b|\bprime\b/, 'black'],
  [/platinum|platina/, 'platinum'],
  [/\bgold\b/, 'gold'],
  [/\bgreen\b/, 'green'],
]

const CHROME_BASE =
  'linear-gradient(115deg, #f7f8fa 0%, #b9bec8 22%, #eef0f4 38%, #8d93a0 58%, #e3e6ec 78%, #a7adb9 100%)'

const themeById: Record<string, Partial<CardTheme> & { from: string; to: string }> = {
  nub: {
    from: '#8f2be3',
    to: '#6a0fb8',
    ink: LIGHT_INK,
    accent: '#f0dcff',
    finish: 'matte',
    pattern: 'none',
    chip: 'silver',
  },
  nuv: {
    from: '#6a14dc',
    to: '#190438',
    ink: LIGHT_INK,
    accent: '#d9b3ff',
    finish: 'gloss',
    pattern: 'lines',
    chip: 'dark',
  },
  nucr: {
    from: '#c9ced7',
    to: '#8d93a0',
    ink: '#5a1fa8',
    accent: '#7b2fd6',
    base: CHROME_BASE,
    finish: 'chrome',
    pattern: 'none',
    chip: 'silver',
  },
  amp: {
    from: '#e9ecf1',
    to: '#8d96a4',
    ink: '#14110d',
    accent: '#2f3744',
    finish: 'metal',
    pattern: 'lines',
    chip: 'silver',
  },
  btgul: {
    from: '#2a5bff',
    to: '#050b3a',
    ink: LIGHT_INK,
    accent: '#8fd8ff',
    finish: 'metal',
    pattern: 'lines',
    chip: 'silver',
  },
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

function brandOf(card: Card, text: string): Brand {
  const line = brandByProductLine.find(([pattern]) => pattern.test(text))
  return line?.[1] ?? brandByIssuer[card.issuer] ?? brandByGroup[card.group]
}

function tierOf(text: string): Tier {
  return tierRules.find(([pattern]) => pattern.test(text))?.[1] ?? 'standard'
}

function paint(tier: Tier, brand: Brand, variant: number) {
  switch (tier) {
    case 'platinum':
      return {
        from: mix(brand.from, '#f1f3f8', 0.86),
        to: mix(brand.to, '#9aa3b2', 0.84),
        finish: 'metal' as const,
        chip: 'silver' as const,
      }
    case 'gold':
      return {
        from: mix('#f3dc92', brand.from, 0.1),
        to: mix('#a9761c', brand.to, 0.1),
        ink: '#2a1c04',
        accent: '#5b3d06',
        finish: 'gloss' as const,
        chip: 'gold' as const,
      }
    case 'green':
      return {
        from: '#46a878',
        to: '#0e3d2b',
        finish: 'gloss' as const,
        chip: 'gold' as const,
      }
    case 'black':
      return {
        from: mix(brand.from, '#000000', 0.6),
        to: mix(brand.to, '#000000', 0.88),
        accent: mix(brand.from, '#ffffff', 0.5),
        finish: 'gloss' as const,
        chip: variant % 2 === 0 ? ('gold' as const) : ('silver' as const),
      }
    case 'elite':
      return {
        from: mix(brand.from, '#000000', 0.72),
        to: '#040405',
        accent: GOLD_ACCENT,
        finish: 'carbon' as const,
        chip: 'gold' as const,
      }
    case 'legend':
      return {
        from: mix(brand.from, '#000000', 0.55),
        to: mix(brand.to, '#000000', 0.9),
        accent: '#e9dfc2',
        finish: 'metal' as const,
        chip: 'silver' as const,
      }
    case 'nanquim':
      return {
        from: mix('#2b2c33', brand.from, 0.16),
        to: '#060608',
        accent: '#d4b062',
        finish: 'matte' as const,
        pattern: 'diagonal' as const,
        chip: 'gold' as const,
      }
    case 'grafite':
      return {
        from: '#707680',
        to: '#1f2227',
        finish: 'metal' as const,
        chip: 'silver' as const,
      }
    case 'diners':
      return {
        from: '#e3e8f0',
        to: '#5d718f',
        ink: '#10213a',
        accent: '#16315c',
        finish: 'metal' as const,
        chip: 'silver' as const,
      }
    case 'centurion':
      return {
        from: '#4a4a4f',
        to: '#060607',
        accent: '#d9b86a',
        finish: 'carbon' as const,
        chip: 'gold' as const,
      }
    default:
      return {
        from: brand.from,
        to: brand.to,
        finish: variant % 2 === 0 ? ('gloss' as const) : ('matte' as const),
        chip: 'gold' as const,
      }
  }
}

function fitBackground(from: string, to: string, ink: string) {
  const toward = ink === LIGHT_INK ? '#000000' : '#ffffff'
  let start = from
  let end = to
  for (
    let step = 0;
    step < MAX_FIT_STEPS &&
    Math.min(contrastRatio(ink, start), contrastRatio(ink, end)) < MIN_INK_CONTRAST;
    step += 1
  ) {
    start = mix(start, toward, FIT_STEP)
    end = mix(end, toward, FIT_STEP)
  }
  return { from: start, to: end }
}

function complete(card: Card, partial: Partial<CardTheme> & { from: string; to: string }): CardTheme {
  const hash = hashText(card.id)
  const angle = 118 + (hash % 5) * 8
  const ink = partial.ink ?? readableInk(mix(partial.from, partial.to, 0.5))
  const { from, to } = partial.base ? partial : fitBackground(partial.from, partial.to, ink)
  const accentCandidate = partial.accent ?? ink
  const accent =
    contrastRatio(accentCandidate, from) >= MIN_ACCENT_CONTRAST &&
    contrastRatio(accentCandidate, to) >= MIN_ACCENT_CONTRAST
      ? accentCandidate
      : ink

  return {
    from,
    to,
    ink,
    accent,
    base: partial.base ?? `linear-gradient(${angle}deg, ${from}, ${to})`,
    finish: partial.finish ?? 'gloss',
    pattern: partial.pattern ?? PATTERNS[(hash >>> 3) % PATTERNS.length],
    chip: partial.chip ?? 'gold',
  }
}

export function getCardTheme(card: Card): CardTheme {
  const override = themeById[card.id]
  if (override) return complete(card, override)

  const text = normalize(`${card.name} ${card.network}`)
  const tier = tierOf(text)
  const variant = hashText(card.id) % 4
  return complete(card, paint(tier, brandOf(card, text), variant))
}
