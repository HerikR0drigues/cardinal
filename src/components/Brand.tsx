import styles from './Brand.module.scss'

export default function Brand() {
  return (
    <div className={styles.brand}>
      <svg
        className={styles.glyph}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
        <path d="M3 10h18" />
      </svg>
      <span>Cardinal</span>
    </div>
  )
}
