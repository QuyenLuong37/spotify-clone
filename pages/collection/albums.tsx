import React, { ReactElement } from 'react'
import Layout from '../../components/Layout'
import LayoutLibrary from '../../components/LayoutLibrary'

function Album() {
  return (
    <LayoutLibrary>
      <div>album</div>
    </LayoutLibrary>
  )
}

export default Album
Album.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}