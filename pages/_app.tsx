import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
// import '../styles/app.css';
import '../styles/layout.css';
import '../styles/header.css';
import '../styles/globals.css';
import '../styles/ant.custom.css';
import { NextPage } from 'next';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import React from 'react';
import { useRouter } from 'next/router';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) { 
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'ononline' in window && 'onoffline' in window) {
      setIsOnline(window.navigator.onLine)
      if (!window.ononline) {
        window.addEventListener('online', () => {
          setIsOnline(true)
        })
      }
      if (!window.onoffline) {
        window.addEventListener('offline', () => {
          setIsOnline(false)
        })
      }
    }
  }, [])

  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && (window as any).workbox !== undefined && isOnline) {
      // skip index route, because it's already cached under `start-url` caching object
      if (router.route !== '/') {
        const wb = (window as any).workbox
        wb.active.then(worker => {
          wb.messageSW({ action: 'CACHE_NEW_ROUTE' })
        })
      }
    }
  }, [isOnline, router.route])
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <RecoilRoot>
      <SessionProvider session={pageProps.session}>
        
        {getLayout(<React.StrictMode><Component {...pageProps} /></React.StrictMode>)}
        
      </SessionProvider>
    </RecoilRoot>
  )
}

export default MyApp
