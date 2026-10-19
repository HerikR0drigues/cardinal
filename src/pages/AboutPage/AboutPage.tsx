import { Link } from 'react-router'
import DetailTile from '@/components/DetailTile'
import Header from '@/components/Header'
import PageSection from '@/components/PageSection'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { INVESTMENT_ROUTE_CARDS, SPEND_ONLY_CARDS, TOTAL_CARDS } from '@/lib/cardStats'
import styles from './AboutPage.module.sass'

export default function AboutPage() {
  useDocumentTitle('Sobre · Cardinal')

  return (
    <div className={styles.page}>
      <Header eyebrow="Sobre" title="Um comparador feito para ser entendido" />
      <div className={styles.content}>
        <p className={styles.lede}>
          O Cardinal compara {TOTAL_CARDS} cartões de crédito premium pelo que importa na hora de
          escolher: quanto zera de anuidade com o seu dinheiro, o retorno, as salas VIP e o
          câmbio. Dos {TOTAL_CARDS}, {INVESTMENT_ROUTE_CARDS} têm rota de isenção por investimento
          e os outros {SPEND_ONLY_CARDS} só zeram por gasto na fatura. O ranking mostra todos, e o
          filtro “Incluir só isenção por gasto” liga e desliga esses últimos. Cada número vem com
          a fonte e com um selo de confiança.
        </p>

        <PageSection title="De onde vem">
          <p>
            Nasceu de uma dificuldade real: escolher o melhor cartão para um perfil específico, com
            regras de anuidade, retorno, salas VIP e câmbio espalhadas por vários lugares. O Cardinal
            reúne tudo numa conta só. Para entender as regras, veja{' '}
            <Link to="/como-funciona">como funciona</Link>.
          </p>
        </PageSection>

        <PageSection title="Como foi construído">
          <dl className={styles.tiles}>
            <DetailTile
              term="React 19 e TypeScript"
              description="Componentes tipados em modo estrito, com a lógica de anuidade e de nota em funções puras separadas da interface."
            />
            <DetailTile
              term="Vite"
              description="Servidor de desenvolvimento e build, com alias @ para os imports."
            />
            <DetailTile
              term="Sass e CSS Modules"
              description="Estilos na sintaxe indentada do Sass, com escopo por componente, tokens e tema claro e escuro."
            />
            <DetailTile
              term="React Router"
              description="Navegação entre ranking, explicação e sobre, com um layout compartilhado."
            />
            <DetailTile
              term="Zustand"
              description="O cenário (aporte, gasto, pesos e regras) vive numa store compartilhada entre as páginas e salva no navegador."
            />
            <DetailTile
              term="Design próprio"
              description="Sem biblioteca de componentes: paleta, raios, tipografia e componentes feitos para o projeto."
            />
          </dl>
        </PageSection>

        <PageSection title="Um aviso importante">
          <p>
            As regras dos cartões mudam e parte dos dados tem confiança média ou baixa. Confirme sempre no app do emissor. Não é recomendação
            financeira.
          </p>
        </PageSection>
      </div>
    </div>
  )
}
