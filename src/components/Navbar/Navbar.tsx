import { Link, NavLink } from 'react-router'
import Brand from '@/components/Brand'
import ThemeToggle from '@/components/ThemeToggle'
import { navigationLinks } from '@/data/navigation'
import { classNames } from '@/lib/classNames'
import styles from './Navbar.module.sass'

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <nav className={styles.inner} aria-label="Principal">
        <Link to="/" className={styles.brand} aria-label="Cardinal, página inicial">
          <Brand />
        </Link>
        <ul className={styles.links}>
          {navigationLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => classNames(styles.link, isActive && styles.active)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
