import { useState } from 'react'
import { usePrefetchCard } from '@/api/queries'
import { confidenceLabels, groupNames } from '@/data/constants'
import { formatOneDecimal } from '@/lib/format'
import type { Confidence, FeeStatus, RankingItem } from '@/types'
import Badge from '@/components/Badge'
import type { BadgeTone } from '@/components/Badge'
import CardDialog from '@/components/CardDialog'
import styles from './CardRow.module.sass'
import CreditCard from '@/components/CreditCard'
import QuickFacts from '@/components/QuickFacts'
import ScoreBar from '@/components/ScoreBar'

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
  item: RankingItem
  position: number
}

export default function CardRow({ item, position }: Readonly<CardRowProps>) {
  const { card, result } = item
  const [isOpen, setIsOpen] = useState(false)
  const prefetchCard = usePrefetchCard()

  return (
    <article className={styles.row}>
      <button
        type="button"
        className={styles.preview}
        tabIndex={-1}
        aria-label={`Ampliar ${card.name}`}
        onClick={() => setIsOpen(true)}
      >
        <CreditCard card={card} />
      </button>
      <div className={styles.info}>
        <div className={styles.top}>
          <span className={`${styles.position} num`} aria-label={`Posição ${position}`}>
            {position}
          </span>
          <div className={styles.heading}>
            <h2 className={styles.name}>
              <button
                type="button"
                className={styles.open}
                onClick={() => setIsOpen(true)}
                onPointerEnter={() => prefetchCard(card.id)}
                onFocus={() => prefetchCard(card.id)}
              >
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
      {isOpen && <CardDialog item={item} onClose={() => setIsOpen(false)} />}
    </article>
  )
}
