import Pill from './Pill'
import PillRow from './PillRow'

interface RulesPanelProps {
  ignoreEntryRequirement: boolean
  hasSalaryPortability: boolean
  onIgnoreEntryRequirementChange: (value: boolean) => void
  onHasSalaryPortabilityChange: (value: boolean) => void
}

export default function RulesPanel({
  ignoreEntryRequirement,
  hasSalaryPortability,
  onIgnoreEntryRequirementChange,
  onHasSalaryPortabilityChange,
}: Readonly<RulesPanelProps>) {
  return (
    <PillRow label="Regras">
      <Pill
        label="Ignorar exigência de renda"
        title="Ignora exigências de renda ou de segmento para pedir o cartão; vale só a regra de isenção por investimento"
        isActive={ignoreEntryRequirement}
        onClick={() => onIgnoreEntryRequirementChange(!ignoreEntryRequirement)}
      />
      <Pill
        label="Com portabilidade de salário"
        title="O salário só pode ir para um banco; vale para comparar onde ele rende mais"
        isActive={hasSalaryPortability}
        onClick={() => onHasSalaryPortabilityChange(!hasSalaryPortability)}
      />
    </PillRow>
  )
}
