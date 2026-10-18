import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>O cartão principal da sua carteira</span>
        <h1 className={styles.title}>Cardinal</h1>
        <p className={styles.tagline}>
          Quais cartões zeram a anuidade pelo dinheiro que você tem investido.
        </p>
      </div>
    </header>
  )
}
