import type { ReactNode } from 'react'
import styles from './Panel.module.sass'

interface PanelProps {
  title: string
  hint?: string
  children: ReactNode
}

export default function Panel({ title, hint, children }: Readonly<PanelProps>) {
  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {hint && <p className={styles.hint}>{hint}</p>}
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  )
}
