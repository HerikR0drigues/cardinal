import styles from './SelectField.module.sass'

interface SelectFieldOption<Value extends string> {
  value: Value
  label: string
}

interface SelectFieldProps<Value extends string> {
  label: string
  options: SelectFieldOption<Value>[]
  value: Value
  onChange: (value: Value) => void
}

export default function SelectField<Value extends string>({
  label,
  options,
  value,
  onChange,
}: Readonly<SelectFieldProps<Value>>) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <select
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value as Value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
