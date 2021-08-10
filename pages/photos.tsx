import Head from 'next/head'
import { useCallback, useState } from 'react'
import Gallery from 'react-photo-gallery'
import galleries from '../components/galleries.json'
import Nav from '../components/nav'
import Modal from '../components/modal'
import styles from '../styles/Photos.module.css'

function Photos() {
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openLightbox = useCallback((event, { index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  const photos = galleries.filter(({ name }) => name === 'Insects')[0].images

  return (
    <div className={styles.container}>
      <Head>
        <title>Shawn Andrews Photography Portfolio - Gallery</title>
        <meta name="description" content="Photography Portfolio Gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Nav showHome />
        <Gallery photos={photos} onClick={openLightbox} />
        {viewerIsOpen && (
          <Modal onClick={closeLightbox} currentImage={photos[currentImage]} />
        )}
      </main>
    </div>
  )
}

export default Photos
