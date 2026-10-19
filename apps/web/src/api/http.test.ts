import { metaSchema } from '@cardinal/shared'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ApiError, request } from './http'

function responder(status: number, body: unknown, rawText?: string) {
  const response = new Response(rawText ?? JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response))
}

afterEach(() => vi.unstubAllGlobals())

describe('request', () => {
  it('devolve o corpo validado pelo schema quando a resposta é 200', async () => {
    responder(200, { totalCards: 121, spendOnlyCards: 64, investmentRouteCards: 57 })
    await expect(request('/meta', { schema: metaSchema })).resolves.toEqual({
      totalCards: 121,
      spendOnlyCards: 64,
      investmentRouteCards: 57,
    })
  })

  it('manda o corpo como JSON e usa o método POST', async () => {
    responder(200, { totalCards: 1, spendOnlyCards: 0, investmentRouteCards: 1 })
    await request('/ranking', { method: 'POST', body: { a: 1 }, schema: metaSchema })
    const [url, init] = vi.mocked(fetch).mock.calls[0]
    expect(url).toBe('/api/ranking')
    expect(init?.method).toBe('POST')
    expect(init?.body).toBe('{"a":1}')
    expect(init?.headers).toEqual({ 'Content-Type': 'application/json' })
  })

  it('transforma o erro padronizado da API em ApiError, com código e detalhes', async () => {
    responder(400, { error: { code: 'VALIDATION_ERROR', message: 'Corpo inválido', details: [{ path: 'x' }] } })
    const erro = await request('/ranking', { schema: metaSchema }).catch((e: unknown) => e)
    expect(erro).toBeInstanceOf(ApiError)
    expect(erro).toMatchObject({ status: 400, code: 'VALIDATION_ERROR', message: 'Corpo inválido', details: [{ path: 'x' }] })
  })

  it('cai em HTTP_ERROR quando o erro não vem no formato da API', async () => {
    responder(502, undefined, '<html>Bad gateway</html>')
    await expect(request('/meta', { schema: metaSchema })).rejects.toMatchObject({ status: 502, code: 'HTTP_ERROR' })
  })

  it('acusa CONTRACT_ERROR quando o 200 não bate com o contrato', async () => {
    responder(200, { totalCards: 'muitos' })
    await expect(request('/meta', { schema: metaSchema })).rejects.toMatchObject({ code: 'CONTRACT_ERROR' })
  })

  it('devolve NETWORK_ERROR quando o fetch falha', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))
    await expect(request('/meta', { schema: metaSchema })).rejects.toMatchObject({ status: 0, code: 'NETWORK_ERROR' })
  })

  it('repassa o AbortError sem disfarçar (cancelamento não é erro de rede)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new DOMException('cancelado', 'AbortError')))
    await expect(request('/meta', { schema: metaSchema })).rejects.toMatchObject({ name: 'AbortError' })
  })
})
