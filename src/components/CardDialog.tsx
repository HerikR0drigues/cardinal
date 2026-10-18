import type { CSSProperties } from 'react'
import { useEffect, useRef } from 'react'
import { confidenceLabels, criteria, groupNames } from '../data/constants'
import { getCardTheme } from '../data/cardThemes'
import { formatOneDecimal } from '../lib/format'
import { calculateScore } from '../lib/score'
import type { Card, Confidence, FeeStatus, Scenario } from '../types'
import Badge from './Badge'
import type { BadgeTone } from './Badge'
import styles from './CardDialog.module.scss'
import CreditCard from './CreditCard'
import DetailTile from './DetailTile'
import ScoreRing from './ScoreRing'
import SourceList from './SourceList'

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

interface CardDialogProps {
  card: Card
  scenario: Scenario
  onClose: () => void
}

export default function CardDialog({ card, scenario, onClose }: Readonly<CardDialogProps>) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const result = calculateScore(card, scenario)
  const theme = getCardTheme(card)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={card.name}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close()
      }}
    >
      <button
        type="button"
        className={styles.close}
        aria-label="Fechar"
        onClick={() => dialogRef.current?.close()}
      >
        ✕
      </button>

      <aside className={styles.aside} style={{ '--aside-color': theme.from } as CSSProperties}>
        <CreditCard card={card} />
        <div className={styles.identity}>
          <h2 className={styles.name}>{card.name}</h2>
          <p className={styles.issuer}>
            {card.issuer} · {card.network}
          </p>
        </div>
        <div className={styles.scoreBlock}>
          <ScoreRing value={result.total} />
          <ul className={styles.breakdown}>
            {criteria.map((criterion) => (
              <li key={criterion.key} className={styles.breakdownItem}>
                <span className={styles.dot} style={{ background: criterion.color }} />
                {criterion.label}
                <span className={`${styles.breakdownValue} num`}>
                  {formatOneDecimal(result.contributions[criterion.key])}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.tags}>
          <Badge tone={FEE_TONE[result.fee.status]}>Anuidade: {result.fee.label}</Badge>
          <Badge>{groupNames[card.group]}</Badge>
          <Badge tone={CONFIDENCE_TONE[card.confidence]}>{confidenceLabels[card.confidence]}</Badge>
        </div>
      </aside>

      <div className={styles.body}>
        <h3 className={styles.bodyTitle}>Detalhes do cartão</h3>
        <dl className={styles.details}>
          <DetailTile isWide term="Como zerar a anuidade" description={card.feeRule} />
          <DetailTile term="Retorno" description={card.rewardsText} />
          <DetailTile term="Salas VIP" description={card.loungeText} />
          <DetailTile isWide term="Câmbio" description={card.exchangeText} />
          {card.caveat && <DetailTile isWide isWarning term="Atenção" description={card.caveat} />}
          {card.notes && <DetailTile isWide term="Observação" description={card.notes} />}
          {card.sources && (
            <DetailTile isWide term="Fontes" description={<SourceList sources={card.sources} />} />
          )}
        </dl>
      </div>
    </dialog>
  )
}
