import Link from 'next/link'
import { useRouter } from 'next/router'
import galleries from './galleries.json'
import styles from '../styles/SubNav.module.css'

function SubNav({ id }: { id: any }) {
  const router = useRouter()
  console.log(router)
  return (
    <ul className={styles.subnav}>
      {galleries
        .sort((a, b) => a.order - b.order)
        .map(({ name, slug }) => {
          return (
            <li key={slug}>
              <Link href={`/photos/${slug}`}>
                <a className={router.query.id === slug ? styles.active : ''}>
                  {name}
                </a>
              </Link>
            </li>
          )
        })}
    </ul>
  )
}

export default SubNav
