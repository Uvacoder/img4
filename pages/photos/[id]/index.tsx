import Head from 'next/head'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import Gallery from 'react-photo-gallery'
import galleries from '../../../components/galleries.json'
import Modal from '../../../components/modal'
import Nav from '../../../components/nav'
import SubNav from '../../../components/subnav'
import styles from '../../../styles/Photos.module.css'

function Photos() {
  const router = useRouter()
  const { id } = router.query

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

  const photos = galleries.filter(({ slug }) => slug === (id || 'insects'))[0]
    .images

  return (
    <div className={styles.container}>
      <Head>
        <title>Bill Lumberg Photography Portfolio - Gallery</title>
        <meta name="description" content="Photography Portfolio Gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Nav showHome />
        {id && <SubNav id={id} />}
        <Gallery photos={photos} onClick={openLightbox} />
        {viewerIsOpen && (
          <Modal onClick={closeLightbox} currentImage={photos[currentImage]} />
        )}
      </main>
    </div>
  )
}

export default Photos
