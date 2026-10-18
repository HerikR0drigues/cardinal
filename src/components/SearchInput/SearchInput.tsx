import styles from './SearchInput.module.sass'

interface SearchInputProps {
  value: string
  placeholder: string
  onChange: (text: string) => void
}

export default function SearchInput({ value, placeholder, onChange }: Readonly<SearchInputProps>) {
  return (
    <input
      className={styles.input}
      type="search"
      aria-label={placeholder}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
