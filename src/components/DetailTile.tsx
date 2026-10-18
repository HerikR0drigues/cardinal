import type { ReactNode } from 'react'
import { classNames } from '../lib/classNames'
import styles from './DetailTile.module.scss'

interface DetailTileProps {
  term: string
  description: ReactNode
  isWide?: boolean
  isWarning?: boolean
}

export default function DetailTile({
  term,
  description,
  isWide = false,
  isWarning = false,
}: Readonly<DetailTileProps>) {
  return (
    <div className={classNames(styles.tile, isWide && styles.wide, isWarning && styles.warning)}>
      <dt className={styles.term}>{term}</dt>
      <dd className={styles.description}>{description}</dd>
    </div>
  )
}
