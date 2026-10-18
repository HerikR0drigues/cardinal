import CardResults from '@/components/CardResults'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import styles from './RankingPage.module.sass'

export default function RankingPage() {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <CardResults />
      </div>
    </div>
  )
}
