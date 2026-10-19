import { Link } from 'react-router'
import { useMetaQuery } from '@/api/queries'
import Brand from '@/components/Brand'
import Skeleton from '@/components/Skeleton'
import { author } from '@/data/author'
import { navigationLinks } from '@/data/navigation'
import styles from './Footer.module.sass'

export default function Footer() {
  const year = new Date().getFullYear()
  const { data: meta } = useMetaQuery()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.about}>
            <Brand />
            <p className={styles.description}>
              Descubra quais cartões premium zeram a anuidade com o seu dinheiro investido e
              quanto devolvem em retorno, salas VIP e câmbio.
            </p>
          </div>
          <nav className={styles.column} aria-label="Rodapé">
            <h2 className={styles.heading}>Navegação</h2>
            <ul className={styles.list}>
              {navigationLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.column}>
            <h2 className={styles.heading}>Sobre os dados</h2>
            <ul className={styles.list}>
              <li>
                {meta ? meta.totalCards : <Skeleton isInline width="2.2ch" height="0.9em" />} cartões na base,{' '}
                {meta ? meta.investmentRouteCards : <Skeleton isInline width="2.2ch" height="0.9em" />} com
                isenção por investimento
              </li>
              <li>Fontes e selo de confiança em cada cartão</li>
              <li>Confirme sempre no app do emissor</li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© {year} Cardinal. Todos os direitos reservados.</p>
          <p>
            Feito por{' '}
            <Link to="/sobre-mim" className={styles.credit}>
              {author.name}
            </Link>{' '}
            · Não é recomendação financeira.
          </p>
        </div>
      </div>
    </footer>
  )
}
