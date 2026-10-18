import { useState } from 'react'
import { confidenceLabels, groupNames } from '../../data/constants'
import { formatOneDecimal } from '../../lib/format'
import { calculateScore } from '../../lib/score'
import type { Card, Confidence, FeeStatus, Scenario } from '../../types'
import Badge from '../Badge'
import type { BadgeTone } from '../Badge'
import CardDialog from '../CardDialog'
import styles from './CardRow.module.sass'
import CreditCard from '../CreditCard'
import QuickFacts from '../QuickFacts'
import ScoreBar from '../ScoreBar'

const FEE_TONE: Record<FeeStatus, BadgeTone> = {
  exempt: 'success',
  partial: 'warning',
  unreachable: 'danger',
}

const CONFIDENCE_TONE: Record<Confidence, BadgeTone> = {
  high: 'success',
  medium: 'neutral',
  low: 'warning',
}

interface CardRowProps {
  card: Card
  scenario: Scenario
  position: number
}

export default function CardRow({ card, scenario, position }: Readonly<CardRowProps>) {
  const [isOpen, setIsOpen] = useState(false)
  const result = calculateScore(card, scenario)

  return (
    <article className={styles.row}>
      <div className={styles.preview} role="presentation" onClick={() => setIsOpen(true)}>
        <CreditCard card={card} />
      </div>
      <div className={styles.info}>
        <div className={styles.top}>
          <span className={`${styles.position} num`} aria-label={`Posição ${position}`}>
            {position}
          </span>
          <div className={styles.heading}>
            <h2 className={styles.name}>
              <button type="button" className={styles.open} onClick={() => setIsOpen(true)}>
                {card.name}
              </button>
            </h2>
            <p className={styles.issuer}>{card.issuer}</p>
          </div>
          <p className={styles.score}>
            <span className={`${styles.scoreValue} num`}>{formatOneDecimal(result.total)}</span>
            <span className={styles.scoreMax}>/100</span>
          </p>
        </div>
        <ScoreBar contributions={result.contributions} />
        <QuickFacts card={card} result={result} />
        <div className={styles.tags}>
          <Badge tone={FEE_TONE[result.fee.status]}>Anuidade: {result.fee.label}</Badge>
          <Badge>{groupNames[card.group]}</Badge>
          <Badge tone={CONFIDENCE_TONE[card.confidence]}>{confidenceLabels[card.confidence]}</Badge>
          {card.isReference && <Badge tone="primary">Referência</Badge>}
          {card.sourcesDisagree && <Badge tone="warning">Fontes divergem</Badge>}
          {card.statusTag && <Badge tone="warning">{card.statusTag}</Badge>}
        </div>
      </div>
      {isOpen && <CardDialog card={card} scenario={scenario} onClose={() => setIsOpen(false)} />}
    </article>
  )
}
