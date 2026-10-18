import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.inner}>
        Dados de blogs especializados. Confirme no app do emissor. Não é recomendação
        financeira.
      </p>
    </footer>
  )
}
