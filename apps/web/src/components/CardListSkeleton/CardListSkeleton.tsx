import CardRowSkeleton from '@/components/CardRowSkeleton'
import styles from './CardListSkeleton.module.sass'

const ROW_COUNT = 6

export default function CardListSkeleton() {
  return (
    <section className={styles.list} aria-busy="true">
      <output className="visually-hidden">Carregando os cartões…</output>
      {Array.from({ length: ROW_COUNT }, (_, index) => (
        <CardRowSkeleton key={index} />
      ))}
    </section>
  )
}
