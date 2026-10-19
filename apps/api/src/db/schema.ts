import { CONFIDENCES, GROUPS, type Tier } from '@cardinal/shared'
import { index, integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const cards = sqliteTable(
  'cards',
  {
    id: text('id').primaryKey(),
    position: integer('position').notNull(),
    name: text('name').notNull(),
    issuer: text('issuer').notNull(),
    network: text('network').notNull(),
    group: text('group_name', { enum: GROUPS }).notNull(),
    annualFee: real('annual_fee').notNull(),
    feeRule: text('fee_rule').notNull(),
    rewardsText: text('rewards_text').notNull(),
    rewardsRate: real('rewards_rate'),
    loungeText: text('lounge_text').notNull(),
    loungeSummary: text('lounge_summary').notNull(),
    loungeScore: real('lounge_score'),
    exchangeText: text('exchange_text').notNull(),
    exchangeScore: real('exchange_score'),
    confidence: text('confidence', { enum: CONFIDENCES }).notNull(),
    exchangeSummary: text('exchange_summary'),
    notes: text('notes'),
    exemptionInvestment: real('exemption_investment'),
    halfDiscountInvestment: real('half_discount_investment'),
    requiresInvestmentToIssue: integer('requires_investment_to_issue', { mode: 'boolean' }),
    caveat: text('caveat'),
    rewardsRateTiers: text('rewards_rate_tiers', { mode: 'json' }).$type<Tier>(),
    loungeScoreTiers: text('lounge_score_tiers', { mode: 'json' }).$type<Tier>(),
    loungeSummaryLow: text('lounge_summary_low'),
    fixedAnnualFee: real('fixed_annual_fee'),
    monthlyFeeWithSalary: real('monthly_fee_with_salary'),
    monthlyFeeWithoutSalary: real('monthly_fee_without_salary'),
    entryRequirement: real('entry_requirement'),
    entryRequirementLabel: text('entry_requirement_label'),
    feeLabelOutOfReach: text('fee_label_out_of_reach'),
    statusTag: text('status_tag'),
    isReference: integer('is_reference', { mode: 'boolean' }),
    acceptsSalaryPortability: integer('accepts_salary_portability', { mode: 'boolean' }),
    isFeeUncertain: integer('is_fee_uncertain', { mode: 'boolean' }),
    sourcesDisagree: integer('sources_disagree', { mode: 'boolean' }),
  },
  (table) => [index('cards_position_idx').on(table.position)],
)

export const cardSources = sqliteTable(
  'card_sources',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    cardId: text('card_id')
      .notNull()
      .references(() => cards.id, { onDelete: 'cascade' }),
    position: integer('position').notNull(),
    url: text('url').notNull(),
  },
  (table) => [index('card_sources_card_idx').on(table.cardId)],
)

export type CardRow = typeof cards.$inferSelect
export type CardInsert = typeof cards.$inferInsert
