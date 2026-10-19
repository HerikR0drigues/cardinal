import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import styles from './RouteErrorPage.module.sass'

export default function RouteErrorPage() {
  useDocumentTitle('Algo deu errado · Cardinal')
  const error = useRouteError()
  const detail = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Erro inesperado'

  return (
    <section className={styles.page} role="alert">
      <h1 className={styles.title}>Algo quebrou nesta página</h1>
      <p className={styles.text}>O resto do site continua funcionando. Detalhe técnico: {detail}</p>
      <div className={styles.actions}>
        <button type="button" className={styles.action} onClick={() => window.location.reload()}>
          Recarregar
        </button>
        <Link to="/" className={styles.link}>
          Voltar ao ranking
        </Link>
      </div>
    </section>
  )
}
