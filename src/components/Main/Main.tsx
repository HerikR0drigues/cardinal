import CardResults from '@/components/CardResults'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useScenario } from '@/hooks/useScenario'
import styles from './Main.module.sass'

export default function Main() {
  const { scenario, updateScenario } = useScenario()

  return (
    <div className={styles.shell}>
      <Sidebar scenario={scenario} onScenarioChange={updateScenario} />
      <div className={styles.content}>
        <Header />
        <CardResults scenario={scenario} />
        <Footer />
      </div>
    </div>
  )
}
