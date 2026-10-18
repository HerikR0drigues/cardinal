import BirdMark from './BirdMark'
import styles from './Brand.module.scss'

export default function Brand() {
  return (
    <div className={styles.brand}>
      <BirdMark className={styles.glyph} />
      <span>Cardinal</span>
    </div>
  )
}
