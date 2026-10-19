import type { RankingItem } from '@/types'
import CardRow from '@/components/CardRow'
import styles from './CardList.module.sass'

interface CardListProps {
  items: RankingItem[]
}

export default function CardList({ items }: Readonly<CardListProps>) {
  if (items.length === 0) {
    return (
      <p className={styles.empty}>
        Nenhum cartão com esses filtros. Troque a origem, a situação da anuidade ou limpe a
        busca.
      </p>
    )
  }

  return (
    <section className={styles.list}>
      {items.map((item, index) => (
        <CardRow key={item.card.id} item={item} position={index + 1} />
      ))}
    </section>
  )
}
