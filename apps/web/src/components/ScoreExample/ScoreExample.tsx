import { useCardQuery, useScoreQuery } from '@/api/queries'
import ErrorState from '@/components/ErrorState'
import Skeleton from '@/components/Skeleton'
import { criteria } from '@/data/constants'
import { formatBrl, formatOneDecimal } from '@/lib/format'
import { useScenario } from '@/store/scenarioStore'
import styles from './ScoreExample.module.sass'

interface ScoreExampleProps {
  cardId: string
}

export default function ScoreExample({ cardId }: Readonly<ScoreExampleProps>) {
  const scenario = useScenario()
  const card = useCardQuery(cardId)
  const score = useScoreQuery(cardId, scenario)

  if (card.isError || score.isError) {
    return (
      <ErrorState
        title="Não foi possível carregar o exemplo"
        error={card.error ?? score.error}
        onRetry={() => {
          void card.refetch()
          void score.refetch()
        }}
      />
    )
  }

  if (!card.data || !score.data) {
    return (
      <div className={styles.example} aria-busy="true">
        <Skeleton width="70%" height="0.9rem" />
        {criteria.map((criterion) => (
          <Skeleton key={criterion.key} height="1.4rem" />
        ))}
        <Skeleton width="30%" height="1.6rem" />
      </div>
    )
  }

  const result = score.data

  return (
    <div className={styles.example}>
      <p className={styles.intro}>
        {card.data.name}, com aporte de {formatBrl(scenario.investment)} e gasto de{' '}
        {formatBrl(scenario.monthlySpend)} por mês.
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Critério</th>
            <th scope="col">Nota</th>
            <th scope="col">Peso</th>
            <th scope="col">Contribuição</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((criterion) => (
            <tr key={criterion.key}>
              <th scope="row">
                <span className={styles.dot} style={{ background: criterion.color }} />
                {criterion.label}
              </th>
              <td className="num">{Math.round(result.scores[criterion.key])}</td>
              <td className="num">
                {result.totalWeight > 0
                  ? Math.round((100 * scenario.weights[criterion.key]) / result.totalWeight)
                  : 0}
                %
              </td>
              <td className="num">{formatOneDecimal(result.contributions[criterion.key])}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colSpan={3}>
              Nota final
            </th>
            <td className="num">{formatOneDecimal(result.total)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
