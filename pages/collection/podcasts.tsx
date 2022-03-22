import React, { ReactElement } from 'react'
import Layout from '../../components/Layout';
import LayoutLibrary from '../../components/LayoutLibrary';

function Podcast() {
  return (
    <div>podcast</div>
  )
}

export default Podcast

Podcast.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <LayoutLibrary>
        {page}
      </LayoutLibrary>
    </Layout>
  )
}