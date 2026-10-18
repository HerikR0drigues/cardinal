import {
  summarizeExchange,
  summarizeFee,
  summarizeLounge,
  summarizeRewards,
} from '../lib/summary'
import type { Card } from '../types'
import styles from './QuickFacts.module.scss'

interface QuickFactsProps {
  card: Card
}

export default function QuickFacts({ card }: Readonly<QuickFactsProps>) {
  const facts = [
    { label: 'Anuidade cheia', fact: summarizeFee(card) },
    { label: 'Retorno', fact: summarizeRewards(card) },
    { label: 'Salas VIP', fact: summarizeLounge(card) },
    { label: 'Câmbio', fact: summarizeExchange(card) },
  ]

  return (
    <dl className={styles.facts}>
      {facts.map(({ label, fact }) => (
        <div key={label} className={styles.fact}>
          <dt className={styles.label}>{label}</dt>
          <dd className={`${styles.value} num`}>{fact.value}</dd>
          {fact.detail && <dd className={styles.detail}>{fact.detail}</dd>}
        </div>
      ))}
    </dl>
  )
}
