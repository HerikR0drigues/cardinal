import { describe, expect, it } from 'vitest'
import { cards as seed } from '../../src/db/seed/cards.data.ts'
import { SqliteCardsRepository } from '../../src/repositories/sqlite-cards.repository.ts'
import { createTestDatabase } from '../helpers/test-app.ts'

describe('SqliteCardsRepository (ida e volta pelo banco)', () => {
  const { db } = createTestDatabase()
  const repository = new SqliteCardsRepository(db)

  it('findAll devolve os 121 cartões na ordem original, sem fontes', async () => {
    const all = await repository.findAll()
    expect(all).toHaveLength(seed.length)
    expect(all.map((card) => card.id)).toEqual(seed.map((card) => card.id))
    const semFontes = seed.map(({ sources: _sources, ...card }) => card)
    expect(all).toEqual(semFontes)
  })

  it('findById devolve o cartão completo, com as fontes na ordem', async () => {
    for (const card of seed) {
      expect(await repository.findById(card.id)).toEqual(card)
    }
  })

  it('findById devolve undefined para id inexistente', async () => {
    expect(await repository.findById('nao-existe')).toBeUndefined()
  })

  it('preserva null onde ele significa "não informado" e omite os campos opcionais ausentes', async () => {
    const croma = await repository.findById('nucr')
    expect(croma?.loungeScore).toBeNull()
    expect(croma?.exchangeScore).toBeNull()
    expect('notes' in (croma ?? {})).toBe(Boolean(seed.find((c) => c.id === 'nucr')?.notes))
    const basico = await repository.findById('nub')
    expect(basico && 'exemptionInvestment' in basico).toBe(false)
  })
})
