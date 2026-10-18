import { criteria } from '@/data/constants'
import type { CriterionScores } from '@/types'
import styles from './ScoreBar.module.sass'

interface ScoreBarProps {
  contributions: CriterionScores
}

export default function ScoreBar({ contributions }: Readonly<ScoreBarProps>) {
  return (
    <div className={styles.bar} role="img" aria-label="Composição da nota">
      {criteria.map((criterion) => (
        <span
          key={criterion.key}
          className={styles.segment}
          style={{ width: `${contributions[criterion.key]}%`, background: criterion.color }}
          title={`${criterion.label}: ${contributions[criterion.key].toFixed(1)}`}
        />
      ))}
      <span className={styles.rest} />
    </div>
  )
}
