import styles from './TimelineItem.module.sass'

interface TimelineItemProps {
  title: string
  subtitle: string
  period: string
  highlights?: string[]
}

export default function TimelineItem({
  title,
  subtitle,
  period,
  highlights,
}: Readonly<TimelineItemProps>) {
  return (
    <article className={styles.item}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <p className={`${styles.period} num`}>{period}</p>
      </header>
      <p className={styles.subtitle}>{subtitle}</p>
      {highlights && (
        <ul className={styles.highlights}>
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}
    </article>
  )
}
