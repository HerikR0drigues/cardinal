import { classNames } from '@/lib/classNames'
import styles from './Skeleton.module.sass'

interface SkeletonProps {
  width?: string
  height?: string
  radius?: string
  isInline?: boolean
}

export default function Skeleton({
  width = '100%',
  height = '1em',
  radius,
  isInline = false,
}: Readonly<SkeletonProps>) {
  return (
    <span
      className={classNames(styles.skeleton, isInline && styles.inline)}
      style={{ width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  )
}
