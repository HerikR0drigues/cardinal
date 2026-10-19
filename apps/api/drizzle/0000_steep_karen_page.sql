CREATE TABLE `card_sources` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`card_id` text NOT NULL,
	`position` integer NOT NULL,
	`url` text NOT NULL,
	FOREIGN KEY (`card_id`) REFERENCES `cards`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `card_sources_card_idx` ON `card_sources` (`card_id`);--> statement-breakpoint
CREATE TABLE `cards` (
	`id` text PRIMARY KEY NOT NULL,
	`position` integer NOT NULL,
	`name` text NOT NULL,
	`issuer` text NOT NULL,
	`network` text NOT NULL,
	`group_name` text NOT NULL,
	`annual_fee` real NOT NULL,
	`fee_rule` text NOT NULL,
	`rewards_text` text NOT NULL,
	`rewards_rate` real,
	`lounge_text` text NOT NULL,
	`lounge_summary` text NOT NULL,
	`lounge_score` real,
	`exchange_text` text NOT NULL,
	`exchange_score` real,
	`confidence` text NOT NULL,
	`exchange_summary` text,
	`notes` text,
	`exemption_investment` real,
	`half_discount_investment` real,
	`requires_investment_to_issue` integer,
	`caveat` text,
	`rewards_rate_tiers` text,
	`lounge_score_tiers` text,
	`lounge_summary_low` text,
	`fixed_annual_fee` real,
	`monthly_fee_with_salary` real,
	`monthly_fee_without_salary` real,
	`entry_requirement` real,
	`entry_requirement_label` text,
	`fee_label_out_of_reach` text,
	`status_tag` text,
	`is_reference` integer,
	`accepts_salary_portability` integer,
	`is_fee_uncertain` integer,
	`sources_disagree` integer
);
--> statement-breakpoint
CREATE INDEX `cards_position_idx` ON `cards` (`position`);