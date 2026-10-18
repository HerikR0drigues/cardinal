import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>O cartão principal da sua carteira</p>
      <h1 className={styles.title}>Quais cartões zeram a sua anuidade?</h1>
    </header>
  )
}
