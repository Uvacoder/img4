import Head from 'next/head'
import Image, { ImageLoaderProps } from 'next/image'
import Link from 'next/link'
import Nav from '../components/nav'
import styles from '../styles/Home.module.css'

export default function Home() {
  const loader = ({ src, width }: ImageLoaderProps) => {
    return `${src}?w=${width}&fm=webp&q=80`
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Bill Lumbergs Photography Portfolio</title>
        <meta name="description" content="Photography Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.bgWrap}>
          <Image
            className={styles.imageDesktop}
            alt=""
            loader={loader}
            src="https://images.ctfassets.net/hn94000t32hs/his9LFFcJgih1Q55bJGoq/844b37b6b477b7a40778ec05fc9fa59c/img-3450.jpg"
            layout="fill"
            objectFit="cover"
          />
          <Image
            className={styles.imageMobile}
            alt=""
            loader={loader}
            src="https://res.cloudinary.com/iarenotamnot/image/upload/v1638691982/alombi.xyz.png"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <Nav showHome={false} />
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <h1>Bill Lumbergs</h1>
            <h3>Photography Portfolio</h3>
            <p>
              <Link href="/photos/insects">Enter Gallery</Link>
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
