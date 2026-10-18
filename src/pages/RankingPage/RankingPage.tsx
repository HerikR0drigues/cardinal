import CardResults from '@/components/CardResults'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import styles from './RankingPage.module.sass'

export default function RankingPage() {
  useDocumentTitle('Cardinal · Ranking de cartões')

  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.content}>
        <Header
          eyebrow="O cartão principal da sua carteira"
          title="Quais cartões zeram a sua anuidade?"
        />
        <CardResults />
      </div>
    </div>
  )
}
