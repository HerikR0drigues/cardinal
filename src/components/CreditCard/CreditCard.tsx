import type { CSSProperties } from 'react'
import { getCardTheme } from '../../data/cardThemes'
import { useTilt } from '../../hooks/useTilt'
import type { Card } from '../../types'
import styles from './CreditCard.module.sass'

interface CreditCardProps {
  card: Card
}

export default function CreditCard({ card }: Readonly<CreditCardProps>) {
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLDivElement>()
  const theme = getCardTheme(card)

  return (
    <div
      ref={ref}
      className={styles.stage}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div
        className={styles.card}
        style={
          {
            '--card-from': theme.from,
            '--card-to': theme.to,
            '--card-ink': theme.ink,
          } as CSSProperties
        }
      >
        <span className={styles.texture} />
        <span className={styles.issuer}>{card.issuer}</span>
        <span className={styles.chip} />
        <span className={styles.network}>{card.network}</span>
        <span className={styles.sheen} />
        <span className={styles.glare} />
      </div>
    </div>
  )
}
