import { classNames } from '../../lib/classNames'
import styles from './Pill.module.sass'

interface PillProps {
  label: string
  isActive: boolean
  onClick: () => void
  title?: string
}

export default function Pill({ label, isActive, onClick, title }: Readonly<PillProps>) {
  return (
    <button
      type="button"
      className={classNames(styles.pill, isActive && styles.active)}
      aria-pressed={isActive}
      onClick={onClick}
      title={title}
    >
      {label}
    </button>
  )
}
