import type { ReactNode } from 'react'
import styles from './PillRow.module.scss'

interface PillRowProps {
  label?: string
  children: ReactNode
}

export default function PillRow({ label, children }: Readonly<PillRowProps>) {
  return (
    <div className={styles.row}>
      {label && <span className={styles.label}>{label}</span>}
      {children}
    </div>
  )
}
