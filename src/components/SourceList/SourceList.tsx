import styles from './SourceList.module.scss'

interface SourceListProps {
  sources: string[]
}

function sourceHref(source: string): string | undefined {
  const match = /https?:\/\/\S+/.exec(source)
  return match?.[0].replace(/[).,;]+$/, '')
}

export default function SourceList({ sources }: Readonly<SourceListProps>) {
  return (
    <ul className={styles.list}>
      {sources.map((source) => {
        const href = sourceHref(source)
        return (
          <li key={source}>
            {href ? (
              <a className={styles.link} href={href} target="_blank" rel="noreferrer">
                {source}
              </a>
            ) : (
              source
            )}
          </li>
        )
      })}
    </ul>
  )
}
