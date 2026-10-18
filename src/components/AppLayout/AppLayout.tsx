import { Outlet, ScrollRestoration } from 'react-router'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import styles from './AppLayout.module.sass'

export default function AppLayout() {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.page}>
        <Outlet />
      </div>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
