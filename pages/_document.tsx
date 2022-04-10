import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name='application-name' content='PWA Spotify' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='PWA Spotify' />
          <meta name='description' content='Best PWA Spotify in the world' />
          <meta name='format-detection' content='telephone=no' />
          <link rel="manifest" crossOrigin="use-credentials" href="manifest.json"/>
          <meta name='msapplication-TileColor' content='#2B5797' />
          <meta name='msapplication-tap-highlight' content='no' />

          <meta name='twitter:card' content='summary' />
          <meta name='twitter:title' content='PWA Spotify' />
          <meta name='twitter:description' content='Best PWA Spotify in the world' />
          <meta name='twitter:creator' content='@QuyenLuong37' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='PWA Spotify' />
          <meta property='og:description' content='Best PWA Spotify in the world' />
          <meta property='og:site_name' content='PWA Spotify' />
          <meta property='og:url' content='https://spotify-clone-quyenluong37.vercel.app' />     
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument