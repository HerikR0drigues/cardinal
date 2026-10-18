import { classNames } from '../lib/classNames'
import styles from './ValueDisplay.module.scss'

interface ValueDisplayProps {
  value: string
}

export default function ValueDisplay({ value }: Readonly<ValueDisplayProps>) {
  return <p className={classNames(styles.value, 'num')}>{value}</p>
}
