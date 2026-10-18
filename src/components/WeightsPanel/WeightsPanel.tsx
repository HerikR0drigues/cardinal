import { criteria, weightPresets } from '../../data/constants'
import type { Weights } from '../../types'
import Panel from '../Panel'
import Pill from '../Pill'
import PillRow from '../PillRow'
import RangeSlider from '../RangeSlider'
import styles from './WeightsPanel.module.scss'

interface WeightsPanelProps {
  weights: Weights
  onWeightsChange: (weights: Weights) => void
}

function isSameWeights(a: Weights, b: Weights): boolean {
  return criteria.every((criterion) => a[criterion.key] === b[criterion.key])
}

export default function WeightsPanel({ weights, onWeightsChange }: Readonly<WeightsPanelProps>) {
  const totalWeight = criteria.reduce((sum, criterion) => sum + weights[criterion.key], 0)

  return (
    <Panel title="Pesos da nota" hint="Cada peso vira uma porcentagem do total">
      {criteria.map((criterion) => {
        const sharePercent =
          totalWeight > 0 ? Math.round((100 * weights[criterion.key]) / totalWeight) : 0

        return (
          <div key={criterion.key} className={styles.row}>
            <span className={styles.criterion}>
              <span className={styles.dot} style={{ background: criterion.color }} />
              {criterion.label}
            </span>
            <RangeSlider
              label={`Peso de ${criterion.label}`}
              value={weights[criterion.key]}
              min={0}
              max={60}
              step={5}
              onChange={(value) => onWeightsChange({ ...weights, [criterion.key]: value })}
            />
            <span className={`${styles.share} num`}>{sharePercent}%</span>
          </div>
        )
      })}
      <PillRow>
        {weightPresets.map((preset) => (
          <Pill
            key={preset.name}
            label={preset.name}
            isActive={isSameWeights(preset.weights, weights)}
            onClick={() => onWeightsChange(preset.weights)}
          />
        ))}
      </PillRow>
    </Panel>
  )
}
