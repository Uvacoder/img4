import { useEffect } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const redirect = sessionStorage.redirect
    delete sessionStorage.redirect
    if (redirect && redirect != location.href) {
      router.replace(redirect)
    }
  }, [])

  return <Component {...pageProps} />
}
export default MyApp
