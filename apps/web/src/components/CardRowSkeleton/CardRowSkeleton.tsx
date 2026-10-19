import Skeleton from '@/components/Skeleton'
import styles from './CardRowSkeleton.module.sass'

const FACT_COUNT = 4
const TAG_WIDTHS = ['7.5rem', '5rem', '6rem']

export default function CardRowSkeleton() {
  return (
    <article className={styles.row} aria-hidden="true">
      <div className={styles.preview}>
        <Skeleton height="100%" radius="var(--radius-lg)" />
      </div>
      <div className={styles.info}>
        <div className={styles.top}>
          <Skeleton width="1.6rem" height="2rem" />
          <div className={styles.heading}>
            <Skeleton width="55%" height="1.2rem" />
            <Skeleton width="25%" height="0.8rem" />
          </div>
          <Skeleton width="4.5rem" height="2rem" />
        </div>
        <Skeleton height="6px" radius="999px" />
        <div className={styles.facts}>
          {Array.from({ length: FACT_COUNT }, (_, index) => (
            <div key={index} className={styles.fact}>
              <Skeleton width="50%" height="0.7rem" />
              <Skeleton width="80%" height="0.95rem" />
              <Skeleton width="65%" height="0.7rem" />
            </div>
          ))}
        </div>
        <div className={styles.tags}>
          {TAG_WIDTHS.map((width) => (
            <Skeleton key={width} width={width} height="1.4rem" radius="999px" />
          ))}
        </div>
      </div>
    </article>
  )
}
