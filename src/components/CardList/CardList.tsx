import type { Card, Scenario } from '../../types'
import CardRow from '../CardRow'
import styles from './CardList.module.sass'

interface CardListProps {
  cards: Card[]
  scenario: Scenario
}

export default function CardList({ cards, scenario }: Readonly<CardListProps>) {
  if (cards.length === 0) {
    return (
      <p className={styles.empty}>
        Nenhum cartão com esses filtros. Troque a origem, a situação da anuidade ou limpe a
        busca.
      </p>
    )
  }

  return (
    <section className={styles.list}>
      {cards.map((card, index) => (
        <CardRow key={card.id} card={card} scenario={scenario} position={index + 1} />
      ))}
    </section>
  )
}
