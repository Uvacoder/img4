import Link from 'next/link'
import styles from '../styles/Nav.module.css'
function Nav(props: { showHome: boolean }) {
  return (
    <div className={styles.container}>
      {props.showHome && (
        <>
          <div className={styles.brand}>
            <Link href="/">SA</Link>
          </div>
          <nav className={styles.nav}>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  )
}

export default Nav
