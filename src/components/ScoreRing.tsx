import { useId } from 'react'
import { formatOneDecimal } from '../lib/format'
import styles from './ScoreRing.module.scss'

const RADIUS = 52
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface ScoreRingProps {
  value: number
}

export default function ScoreRing({ value }: Readonly<ScoreRingProps>) {
  const gradientId = useId()
  const filled = (CIRCUMFERENCE * Math.min(Math.max(value, 0), 100)) / 100

  return (
    <div className={styles.ring} role="img" aria-label={`Nota ${formatOneDecimal(value)} de 100`}>
      <svg className={styles.svg} viewBox="0 0 120 120">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--secondary)" />
          </linearGradient>
        </defs>
        <circle className={styles.track} cx="60" cy="60" r={RADIUS} />
        <circle
          className={styles.value}
          cx="60"
          cy="60"
          r={RADIUS}
          stroke={`url(#${gradientId})`}
          strokeDasharray={`${filled} ${CIRCUMFERENCE}`}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className={styles.label}>
        <span className={`${styles.number} num`}>{formatOneDecimal(value)}</span>
        <span className={styles.max}>de 100</span>
      </div>
    </div>
  )
}
