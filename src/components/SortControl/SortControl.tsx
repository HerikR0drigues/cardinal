import { sortOptions } from '@/data/constants'
import type { Sorting } from '@/types'
import SelectField from '@/components/SelectField'
import styles from './SortControl.module.sass'

interface SortControlProps {
  sorting: Sorting
  onSortingChange: (sorting: Sorting) => void
}

export default function SortControl({ sorting, onSortingChange }: Readonly<SortControlProps>) {
  const isDescending = sorting.direction === 'desc'

  return (
    <div className={styles.control}>
      <SelectField
        label="Ordenar"
        options={sortOptions}
        value={sorting.key}
        onChange={(key) => onSortingChange({ ...sorting, key })}
      />
      <button
        type="button"
        className={styles.direction}
        aria-label="Inverter ordem"
        onClick={() =>
          onSortingChange({ ...sorting, direction: isDescending ? 'asc' : 'desc' })
        }
      >
        {isDescending ? '↓' : '↑'}
      </button>
    </div>
  )
}
