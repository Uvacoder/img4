import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '../components/nav'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Shawn Andrews Photography Portfolio</title>
        <meta name="description" content="Photography Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.bgWrap}>
          <Image
            className={styles.imageDesktop}
            alt=""
            src="/bkg-home.jpg"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <Image
            className={styles.imageMobile}
            alt=""
            src="/bkg-home-mobile.jpg"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <Nav showHome={false} />
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <h1>Shawn Andrews</h1>
            <h3>Photography Portfolio</h3>
            <p>
              <Link href="/photos">Visit Gallery</Link>
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
