import { Link } from 'react-router'
import DetailTile from '@/components/DetailTile'
import Header from '@/components/Header'
import PageSection from '@/components/PageSection'
import ScoreExample from '@/components/ScoreExample'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { MODULE_DISCOUNT_PER_STEP, MODULE_DISCOUNT_STEP_INVESTMENT } from '@/lib/fee'
import { formatBrl, formatPercent } from '@/lib/format'
import {
  FEE_AT_ZERO_SCORE,
  REWARDS_RATE_FOR_FULL_SCORE,
  UNKNOWN_EXCHANGE_SCORE,
  UNKNOWN_LOUNGE_SCORE,
  UNKNOWN_REWARDS_SCORE,
} from '@/lib/score'
import styles from './HowItWorksPage.module.sass'

const EXAMPLE_CARD_ID = 'nuv'

export default function HowItWorksPage() {
  useDocumentTitle('Como funciona · Cardinal')

  return (
    <div className={styles.page}>
      <Header eyebrow="Como funciona" title="A lógica por trás do ranking" />
      <div className={styles.content}>
        <p className={styles.lede}>
          O Cardinal responde duas perguntas: quanto você paga de anuidade com o dinheiro que já
          tem investido e quanto cada cartão devolve em retorno, salas VIP e câmbio. Tudo é
          calculado no seu navegador, com as regras abaixo, e se refaz quando você mexe no aporte,
          no gasto ou nos pesos.
        </p>

        <PageSection title="1. Anuidade: o que você paga com o seu dinheiro">
          <p>
            Para cada cartão, as regras são avaliadas nesta ordem. A primeira que se aplica define
            o resultado.
          </p>
          <ol className={styles.steps}>
            <li>
              <strong>Exigência de renda ou segmento.</strong> Se o cartão exige algo que você não
              alcança, ele aparece como fora do alcance. Dá para ignorar essa exigência no painel
              de regras.
            </li>
            <li>
              <strong>Mensalidade com desconto.</strong> Em alguns cartões a mensalidade cai{' '}
              {formatBrl(MODULE_DISCOUNT_PER_STEP)} a cada{' '}
              {formatBrl(MODULE_DISCOUNT_STEP_INVESTMENT)} investidos, e o valor muda se você
              traz o salário.
            </li>
            <li>
              <strong>Anuidade fixa.</strong> Sem rota de isenção: o valor é o valor.
            </li>
            <li>
              <strong>Investimento para emitir.</strong> Há cartões que só são emitidos com um
              mínimo investido na instituição.
            </li>
            <li>
              <strong>Isenção ou 50% de desconto.</strong> O investimento na própria instituição
              zera a anuidade ou corta metade, conforme a faixa.
            </li>
            <li>
              <strong>Só por gasto.</strong> Sem rota por investimento, a isenção depende do que
              você gasta na fatura. Esses cartões aparecem no ranking, e dá para ocultá-los
              desligando a opção de incluir isenção por gasto.
            </li>
          </ol>
          <p>
            Cartões que aceitam portabilidade de salário ficam isentos quando essa opção está
            ligada, a menos que o cartão exija um investimento que você não tem. O resultado vira
            um de três estados: isenta, parcial (você paga parte) ou fora do alcance.
          </p>
        </PageSection>

        <PageSection title="2. A nota de 0 a 100">
          <p>
            Cada cartão recebe uma nota em quatro critérios. A nota final é a média deles
            ponderada pelos seus pesos.
          </p>
          <dl className={styles.tiles}>
            <DetailTile
              term="Anuidade"
              description={`Isenta vale 100. Caso contrário, a nota cai em linha reta conforme o custo anual, chegando a 0 em ${formatBrl(FEE_AT_ZERO_SCORE)}. Se o cartão exige algo que você não tem e não há valor a calcular, a nota é 0.`}
            />
            <DetailTile
              term="Retorno"
              description={`A taxa de retorno dividida por ${formatPercent(REWARDS_RATE_FOR_FULL_SCORE)}: retorno de ${formatPercent(REWARDS_RATE_FOR_FULL_SCORE)} ou mais vale 100. Sem dado, a nota é ${UNKNOWN_REWARDS_SCORE}.`}
            />
            <DetailTile
              term="Salas VIP"
              description={`Vem da base: 0 sem acesso, 40 para cerca de 2 visitas por ano, 60 para 4, de 75 a 80 para 8 a 12 e de 90 a 100 para acesso ilimitado. Em alguns cartões depende do gasto. Sem dado, a nota é ${UNKNOWN_LOUNGE_SCORE}.`}
            />
            <DetailTile
              term="Câmbio"
              description={`100 menos 9 pontos para cada 1% de custo total (spread mais IOF). Um custo de 3,5% dá 69. Sem dado, a nota é ${UNKNOWN_EXCHANGE_SCORE}.`}
            />
          </dl>
          <p>
            Os pesos viram porcentagens do total, então só a proporção entre eles importa. Você
            ajusta no painel do <Link to="/">ranking</Link>, ou parte de um preset.
          </p>
          <ScoreExample cardId={EXAMPLE_CARD_ID} />
          <p>
            O exemplo acima usa os números que você deixou no ranking. Mude lá e volte aqui: a
            conta se refaz.
          </p>
        </PageSection>

        <PageSection title="3. Retorno anual estimado">
          <p>
            O valor em reais que aparece em cada cartão é o seu gasto mensal vezes 12 vezes a taxa
            de retorno do cartão. Quando o benefício depende do tamanho da fatura, a taxa usada é a
            da faixa do seu gasto. Para pontos e milhas, a base converte em porcentagem do gasto
            com um valor aproximado do ponto, por isso o valor aparece com til.
          </p>
          <p>
            É retorno bruto: a anuidade não é descontada e não considera como você vai usar os
            pontos.
          </p>
        </PageSection>

        <PageSection title="4. Confiança dos dados">
          <dl className={styles.tiles}>
            <DetailTile
              term="Confiança alta"
              description="A página oficial atual do emissor confirma anuidade e regra de isenção."
            />
            <DetailTile
              term="Confiança média"
              description="Blogs especializados ou central de ajuda, sem confirmação oficial."
            />
            <DetailTile
              term="Confiança baixa"
              description="Fonte única, antiga ou contraditória. Trate o número como pista, não como garantia."
            />
            <DetailTile
              term="Fontes divergem"
              description="Quando as fontes discordam em algo relevante, o cartão ganha esse aviso."
            />
          </dl>
          <p>
            O selo de confiança não entra na nota. Ele é um aviso à parte, e cada cartão traz as
            fontes para você conferir.
          </p>
        </PageSection>

        <PageSection title="5. Limites">
          <ul className={styles.list}>
            <li>Os dados vêm de blogs especializados e de páginas dos emissores, e mudam.</li>
            <li>Câmbio e salas VIP são aproximações para comparar, não condições contratuais.</li>
            <li>
              Aprovação do cartão, limite e relacionamento com o banco ficam fora do cálculo.
            </li>
            <li>Confirme tudo no app do emissor. Não é recomendação financeira.</li>
          </ul>
        </PageSection>
      </div>
    </div>
  )
}
