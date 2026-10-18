import styles from './Header.module.sass'

interface HeaderProps {
  eyebrow: string
  title: string
}

export default function Header({ eyebrow, title }: Readonly<HeaderProps>) {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
    </header>
  )
}
