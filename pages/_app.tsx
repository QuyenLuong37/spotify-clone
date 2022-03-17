
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import '../styles/app.css';
import '../styles/layout.css';
import '../styles/header.css';
import '../styles/globals.css'
import Layout from '../components/Layout';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SessionProvider session={pageProps.session}>
        
    <Layout >
        <Component {...pageProps} />
     </Layout>
      </SessionProvider>
    </RecoilRoot>
  )
}

export default MyApp
