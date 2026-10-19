type Rgb = [number, number, number]

const MAX_CHANNEL = 255

function toRgb(hex: string): Rgb {
  const value = hex.replace('#', '')
  const full = value.length === 3 ? [...value].map((digit) => digit + digit).join('') : value
  return [
    Number.parseInt(full.slice(0, 2), 16),
    Number.parseInt(full.slice(2, 4), 16),
    Number.parseInt(full.slice(4, 6), 16),
  ]
}

function toHex([red, green, blue]: Rgb): string {
  return `#${[red, green, blue]
    .map((channel) =>
      Math.round(Math.min(Math.max(channel, 0), MAX_CHANNEL))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`
}

export function mix(from: string, to: string, amount: number): string {
  const start = toRgb(from)
  const end = toRgb(to)
  return toHex([
    start[0] + (end[0] - start[0]) * amount,
    start[1] + (end[1] - start[1]) * amount,
    start[2] + (end[2] - start[2]) * amount,
  ])
}

function luminance(hex: string): number {
  const [red, green, blue] = toRgb(hex).map((channel) => {
    const scaled = channel / MAX_CHANNEL
    return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

export function contrastRatio(first: string, second: string): number {
  const lighter = Math.max(luminance(first), luminance(second))
  const darker = Math.min(luminance(first), luminance(second))
  return (lighter + 0.05) / (darker + 0.05)
}

export function readableInk(background: string): string {
  return contrastRatio('#ffffff', background) >= contrastRatio('#14110d', background)
    ? '#ffffff'
    : '#14110d'
}

export function hashText(text: string): number {
  let hash = 2166136261
  for (const character of text) {
    hash ^= character.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}
