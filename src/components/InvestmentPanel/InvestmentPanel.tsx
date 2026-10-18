import { investmentPresets } from '../../data/constants'
import { formatBrl, formatCompactBrl } from '../../lib/format'
import Panel from '../Panel'
import Pill from '../Pill'
import PillRow from '../PillRow'
import RangeSlider from '../RangeSlider'
import ValueDisplay from '../ValueDisplay'

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
      <ValueDisplay value={formatBrl(investment)} />
      <RangeSlider
        label="Valor investido"
        value={investment}
        min={0}
        max={300000}
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
