import { formatBrl } from '../lib/format'
import Panel from './Panel'
import RangeSlider from './RangeSlider'
import ValueDisplay from './ValueDisplay'

interface SpendPanelProps {
  monthlySpend: number
  onMonthlySpendChange: (value: number) => void
}

export default function SpendPanel({
  monthlySpend,
  onMonthlySpendChange,
}: Readonly<SpendPanelProps>) {
  return (
    <Panel
      title="Seu gasto mensal no cartão"
      hint="Entra só no retorno e nas salas VIP. A anuidade segue só pelo valor investido."
    >
      <ValueDisplay value={formatBrl(monthlySpend)} />
      <RangeSlider
        label="Gasto mensal no cartão"
        value={monthlySpend}
        min={0}
        max={10000}
        step={500}
        onChange={onMonthlySpendChange}
      />
    </Panel>
  )
}
