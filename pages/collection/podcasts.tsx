import React, { ReactElement } from 'react'
import Layout from '../../components/Layout';
import LayoutLibrary from '../../components/LayoutLibrary';

function Podcast() {
  return (
    <LayoutLibrary>
      <div>
          <div>podcast</div>
      </div>
    </LayoutLibrary>
  )
}

export default Podcast

Podcast.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}