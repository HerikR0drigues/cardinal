import { useRankingQuery } from '@/api/queries'
import CardList from '@/components/CardList'
import CardListSkeleton from '@/components/CardListSkeleton'
import ErrorState from '@/components/ErrorState'
import Skeleton from '@/components/Skeleton'
import SortControl from '@/components/SortControl'
import Toolbar from '@/components/Toolbar'
import { useRankingRequest } from '@/hooks/useRankingRequest'
import { useFiltersStore } from '@/store/filtersStore'
import styles from './CardResults.module.sass'

export default function CardResults() {
  const filters = useFiltersStore((state) => state.filters)
  const sorting = useFiltersStore((state) => state.sorting)
  const setFilters = useFiltersStore((state) => state.setFilters)
  const setSorting = useFiltersStore((state) => state.setSorting)

  const { data, isPending, isError, error, refetch, isFetching, isPlaceholderData } =
    useRankingQuery(useRankingRequest())
  const hiddenCount = data?.hiddenSpendOnlyCount ?? 0

  return (
    <main className={styles.main} aria-busy={isFetching}>
      <Toolbar filters={filters} onFiltersChange={setFilters} />
      <div className={styles.resultsBar}>
        <div className={styles.summary}>
          {data ? (
            <p className={styles.count}>{data.total} cartões</p>
          ) : (
            <Skeleton width="5.5rem" height="0.9rem" />
          )}
          {hiddenCount > 0 && (
            <p className={styles.hidden}>
              {hiddenCount} {hiddenCount === 1 ? 'cartão que só zera' : 'cartões que só zeram'} por
              gasto {hiddenCount === 1 ? 'está oculto' : 'estão ocultos'}.{' '}
              <button
                type="button"
                className={styles.show}
                onClick={() => setFilters({ includeSpendOnly: true })}
              >
                Mostrar
              </button>
            </p>
          )}
        </div>
        <SortControl sorting={sorting} onSortingChange={setSorting} />
      </div>
      <div className={styles.activity} data-active={isFetching && !isPending ? 'true' : undefined}>
        <output className="visually-hidden">
          {isFetching && !isPending ? 'Atualizando o ranking…' : ''}
        </output>
      </div>
      {isPending && <CardListSkeleton />}
      {isError && !data && (
        <ErrorState title="Não foi possível carregar os cartões" error={error} onRetry={() => refetch()} />
      )}
      {data && (
        <div className={styles.results} data-stale={isPlaceholderData ? 'true' : undefined}>
          <CardList items={data.items} />
        </div>
      )}
    </main>
  )
}
