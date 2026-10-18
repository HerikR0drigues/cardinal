import { useId } from 'react'
import type { ReactNode } from 'react'
import styles from './PageSection.module.sass'

interface PageSectionProps {
  title: string
  children: ReactNode
}

export default function PageSection({ title, children }: Readonly<PageSectionProps>) {
  const titleId = useId()

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      <div className={styles.body}>{children}</div>
    </section>
  )
}
