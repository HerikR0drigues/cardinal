import { formatOneDecimal } from '@/lib/format'
import styles from './ScoreRing.module.sass'

const RADIUS = 56
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface ScoreRingProps {
  value: number
}

export default function ScoreRing({ value }: Readonly<ScoreRingProps>) {
  const filled = (CIRCUMFERENCE * Math.min(Math.max(value, 0), 100)) / 100

  return (
    <div className={styles.ring}>
      <svg className={styles.svg} viewBox="0 0 120 120" aria-hidden="true">
        <circle className={styles.track} cx="60" cy="60" r={RADIUS} />
        <circle
          className={styles.value}
          cx="60"
          cy="60"
          r={RADIUS}
          strokeDasharray={`${filled} ${CIRCUMFERENCE}`}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className={styles.label}>
        <span className="visually-hidden">Nota </span>
        <span className={`${styles.number} num`}>{formatOneDecimal(value)}</span>
        <span className={styles.max}>de 100</span>
      </div>
    </div>
  )
}
