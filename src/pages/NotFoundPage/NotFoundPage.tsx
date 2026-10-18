import { Link } from 'react-router'
import styles from './NotFoundPage.module.sass'

export default function NotFoundPage() {
  return (
    <section className={styles.page}>
      <p className={`${styles.code} num`}>404</p>
      <h1 className={styles.title}>Essa página não existe</h1>
      <p className={styles.text}>O endereço pode ter mudado ou ter sido digitado errado.</p>
      <Link to="/" className={styles.action}>
        Voltar ao ranking
      </Link>
    </section>
  )
}
