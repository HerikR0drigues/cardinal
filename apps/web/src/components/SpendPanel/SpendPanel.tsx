import AmountInput from '@/components/AmountInput'
import Panel from '@/components/Panel'
import RangeSlider from '@/components/RangeSlider'

const SPEND_INPUT_MAX = 1_000_000

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
      <AmountInput
        label="Gasto mensal no cartão, em reais"
        value={monthlySpend}
        max={SPEND_INPUT_MAX}
        onChange={onMonthlySpendChange}
      />
      <RangeSlider
        label="Gasto mensal no cartão"
        value={monthlySpend}
        min={0}
        max={100000}
        step={500}
        onChange={onMonthlySpendChange}
      />
    </Panel>
  )
}
