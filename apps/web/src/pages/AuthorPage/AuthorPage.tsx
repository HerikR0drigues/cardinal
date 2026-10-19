import { Link } from 'react-router'
import DetailTile from '@/components/DetailTile'
import Header from '@/components/Header'
import PageSection from '@/components/PageSection'
import TimelineItem from '@/components/TimelineItem'
import { author } from '@/data/author'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import styles from './AuthorPage.module.sass'

export default function AuthorPage() {
  useDocumentTitle(`Sobre mim · ${author.name} · Cardinal`)

  return (
    <div className={styles.page}>
      <Header eyebrow={author.headline} title={`Feito por ${author.name}`} />
      <div className={styles.content}>
        <div className={styles.bio}>
          {author.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className={styles.location}>{author.location}</p>
        </div>

        <PageSection title="Contato">
          <ul className={styles.links}>
            {author.links.map((link) => (
              <li key={link.href}>
                <a
                  className={styles.link}
                  href={link.href}
                  {...(link.href.startsWith('http') && { target: '_blank', rel: 'noreferrer noopener' })}
                >
                  <span className={styles.label}>{link.label}</span>
                  <span className={styles.description}>{link.description}</span>
                </a>
              </li>
            ))}
          </ul>
        </PageSection>

        <PageSection title="Experiência">
          <div>
            {author.experience.map((entry) => (
              <TimelineItem key={entry.title + entry.period} {...entry} />
            ))}
          </div>
        </PageSection>

        <PageSection title="Competências">
          <dl className={styles.tiles}>
            {author.skills.map((skill) => (
              <DetailTile key={skill.group} term={skill.group} description={skill.items.join(' · ')} />
            ))}
          </dl>
        </PageSection>

        <PageSection title="Formação">
          <div>
            {author.education.map((entry) => (
              <TimelineItem key={entry.title} {...entry} />
            ))}
          </div>
        </PageSection>

        <PageSection title="Certificações">
          <ul className={styles.certifications}>
            {author.certifications.map((certification) => (
              <li key={certification.name} className={styles.certification}>
                <span className={styles.certificationName}>{certification.name}</span>
                <span className={styles.certificationMeta}>
                  {[certification.issuer, certification.date].filter(Boolean).join(' · ')}
                </span>
              </li>
            ))}
          </ul>
        </PageSection>

        <PageSection title="Sobre o projeto">
          <p>
            Para ver como o Cardinal foi construído e quais regras ele usa, veja{' '}
            <Link to="/sobre">sobre o projeto</Link> e <Link to="/como-funciona">como funciona</Link>.
          </p>
        </PageSection>
      </div>
    </div>
  )
}
