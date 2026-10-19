import { useLayoutEffect, useRef, useState } from 'react'
import type { ChangeEvent, KeyboardEvent } from 'react'
import { formatNumber } from '@/lib/format'
import styles from './AmountInput.module.sass'

interface AmountInputProps {
  label: string
  value: number
  max: number
  onChange: (value: number) => void
}

export default function AmountInput({ label, value, max, onChange }: Readonly<AmountInputProps>) {
  const [draft, setDraft] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const shouldSelectRef = useRef(false)

  useLayoutEffect(() => {
    if (!shouldSelectRef.current) return
    shouldSelectRef.current = false
    inputRef.current?.select()
  }, [draft])

  const handleFocus = () => {
    shouldSelectRef.current = true
    setDraft(String(value))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, '')
    if (digits === '') {
      setDraft('')
      return
    }
    const amount = Math.min(Number(digits), max)
    setDraft(String(amount))
    onChange(amount)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') event.currentTarget.blur()
  }

  return (
    <label className={styles.field}>
      <span className={styles.currency} aria-hidden="true">
        R$
      </span>
      <input
        ref={inputRef}
        className={`${styles.input} num`}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        aria-label={label}
        value={draft ?? formatNumber(value)}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={() => setDraft(null)}
        onKeyDown={handleKeyDown}
      />
    </label>
  )
}
