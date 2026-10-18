# Cardinal

O cartão principal da sua carteira. Comparador de cartões de crédito premium (corretoras, bancos, digitais e globais) que mostra quais zeram a anuidade pelo valor investido e quanto sobra de retorno, salas VIP e câmbio com o seu gasto mensal.

Feito em React + TypeScript + Sass (CSS Modules), com Vite. Evolução do [Radar de Cartões](https://github.com/HerikR0drigues/radar-de-cartoes), que era uma página única em HTML.

## Rodando

```bash
npm install
npm run dev
```

Node 22 (há um `mise.toml` na raiz). Outros comandos: `npm run lint`, `npm run build`.

## Como a nota funciona

Cada cartão recebe de 0 a 100 em quatro critérios (anuidade, retorno, salas VIP e câmbio). A nota final é a média ponderada pelos pesos escolhidos na tela. As regras ficam em `src/lib/` como funções puras que recebem o cenário (investimento, gasto, pesos) por parâmetro.

## Estrutura

- `src/data/`: cartões (`cards.ts`), constantes e cores de cada banco (`cardThemes.ts`)
- `src/lib/`: anuidade, nota, filtros, ordenação, resumos e formatação
- `src/hooks/`: `useRanking`, `useLocalStorage`, `useTilt`
- `src/components/`: um componente por arquivo, com seu `.module.sass`
- `src/styles/`: paleta, tokens e base do design system

## Sobre os dados

Os dados vêm de blogs especializados e, quando abriram, de páginas oficiais, com consulta em out/2026. Cada cartão traz a confiança (alta, média ou baixa) e as fontes, que aparecem no modal. Muitas páginas oficiais não abriram na pesquisa, então confirme com o emissor antes de decidir. Não é recomendação financeira.
