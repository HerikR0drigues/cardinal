import CardResults from '@/components/CardResults'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import styles from './Main.module.sass'

export default function Main() {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <CardResults />
        <Footer />
      </div>
    </div>
  )
}
