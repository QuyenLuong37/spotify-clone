import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
// import '../styles/app.css';
import '../styles/layout.css';
import '../styles/header.css';
import '../styles/globals.css';
import '../styles/ant.custom.css';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import React from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {  
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
