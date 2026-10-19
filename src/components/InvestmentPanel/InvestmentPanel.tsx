import { investmentPresets } from '@/data/constants'
import { formatCompactBrl } from '@/lib/format'
import AmountInput from '@/components/AmountInput'
import Panel from '@/components/Panel'
import Pill from '@/components/Pill'
import PillRow from '@/components/PillRow'
import RangeSlider from '@/components/RangeSlider'

const INVESTMENT_INPUT_MAX = 100_000_000

interface InvestmentPanelProps {
  investment: number
  onInvestmentChange: (value: number) => void
}

export default function InvestmentPanel({
  investment,
  onInvestmentChange,
}: Readonly<InvestmentPanelProps>) {
  return (
    <Panel title="Quanto você tem investido" hint="No banco ou corretora do cartão">
      <AmountInput
        label="Valor investido, em reais"
        value={investment}
        max={INVESTMENT_INPUT_MAX}
        onChange={onInvestmentChange}
      />
      <RangeSlider
        label="Valor investido"
        value={investment}
        min={0}
        max={5000000}
        step={5000}
        onChange={onInvestmentChange}
      />
      <PillRow>
        {investmentPresets.map((preset) => (
          <Pill
            key={preset}
            label={formatCompactBrl(preset)}
            isActive={preset === investment}
            onClick={() => onInvestmentChange(preset)}
          />
        ))}
      </PillRow>
    </Panel>
  )
}
