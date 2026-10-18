import { feeStatusOptions, groupOptions } from '@/data/constants'
import type { Filters } from '@/types'
import Pill from '@/components/Pill'
import PillGroup from '@/components/PillGroup'
import PillRow from '@/components/PillRow'
import SearchInput from '@/components/SearchInput'
import styles from './Toolbar.module.sass'

interface ToolbarProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export default function Toolbar({ filters, onFiltersChange }: Readonly<ToolbarProps>) {
  return (
    <section className={styles.toolbar} aria-label="Filtros">
      <SearchInput
        value={filters.searchText}
        placeholder="Buscar cartão ou banco"
        onChange={(searchText) => onFiltersChange({ ...filters, searchText })}
      />
      <PillGroup
        label="Origem"
        options={groupOptions}
        selected={filters.group}
        onSelect={(group) => onFiltersChange({ ...filters, group })}
      />
      <PillGroup
        label="Anuidade"
        options={feeStatusOptions}
        selected={filters.feeStatus}
        onSelect={(feeStatus) => onFiltersChange({ ...filters, feeStatus })}
      />
      <PillRow label="Mostrar">
        <Pill
          label="Com sala VIP"
          isActive={filters.loungeOnly}
          onClick={() => onFiltersChange({ ...filters, loungeOnly: !filters.loungeOnly })}
        />
        <Pill
          label="Incluir só isenção por gasto"
          isActive={filters.includeSpendOnly}
          onClick={() =>
            onFiltersChange({ ...filters, includeSpendOnly: !filters.includeSpendOnly })
          }
        />
      </PillRow>
    </section>
  )
}
