import Pill from './Pill'
import PillRow from './PillRow'

interface PillGroupOption<Value extends string> {
  value: Value
  label: string
}

interface PillGroupProps<Value extends string> {
  label: string
  options: PillGroupOption<Value>[]
  selected: Value
  onSelect: (value: Value) => void
}

export default function PillGroup<Value extends string>({
  label,
  options,
  selected,
  onSelect,
}: Readonly<PillGroupProps<Value>>) {
  return (
    <PillRow label={label}>
      {options.map((option) => (
        <Pill
          key={option.value}
          label={option.label}
          isActive={option.value === selected}
          onClick={() => onSelect(option.value)}
        />
      ))}
    </PillRow>
  )
}
