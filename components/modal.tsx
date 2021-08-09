import Image, { ImageLoaderProps } from 'next/image'
import styles from '../styles/Modal.module.css'

interface ModalProps {
  onClick: () => void
  currentImage: {
    url: string
    key: string
    width: number
    height: number
  }
}

function Modal({
  onClick,
  currentImage: { url, key, width, height },
}: ModalProps) {
  const loader = ({ src, width }: ImageLoaderProps) => {
    return `${src}?w=${width}&fm=webp&q=80`
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.close} onClick={onClick}>
          &times;
        </button>
        <div className={styles.modalImage}>
          <Image
            id={key}
            loader={loader}
            src={url}
            alt=""
            layout="fill"
            objectFit="contain"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(width, height)
            )}`}
          />
        </div>
      </div>
    </div>
  )
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#000" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#000" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#000" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export default Modal
