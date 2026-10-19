import type { CSSProperties } from 'react'
import styles from './RangeSlider.module.sass'

interface RangeSliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}

export default function RangeSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: Readonly<RangeSliderProps>) {
  const fillPercent =
    max > min ? Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100) : 0

  return (
    <input
      className={styles.slider}
      style={{ '--fill': `${fillPercent}%` } as CSSProperties}
      type="range"
      aria-label={label}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  )
}
