import { ApiError } from '@/api/http'
import styles from './ErrorState.module.sass'

interface ErrorStateProps {
  title: string
  error: unknown
  onRetry: () => void
}

export default function ErrorState({ title, error, onRetry }: Readonly<ErrorStateProps>) {
  const message =
    error instanceof ApiError ? error.message : 'Algo deu errado. Tente de novo em instantes.'

  return (
    <div className={styles.state} role="alert">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      <button type="button" className={styles.retry} onClick={onRetry}>
        Tentar de novo
      </button>
    </div>
  )
}
