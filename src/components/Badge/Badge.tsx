import type { ReactNode } from 'react'
import { classNames } from '../../lib/classNames'
import styles from './Badge.module.sass'

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger'

interface BadgeProps {
  tone?: BadgeTone
  children: ReactNode
}

export default function Badge({ tone = 'neutral', children }: Readonly<BadgeProps>) {
  return (
    <span
      className={classNames(styles.badge, styles[tone], tone !== 'neutral' && styles.dot)}
    >
      {children}
    </span>
  )
}
