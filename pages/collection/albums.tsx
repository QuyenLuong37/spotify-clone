import React, { ReactElement } from 'react'
import Layout from '../../components/Layout'
import LayoutLibrary from '../../components/LayoutLibrary'

function Album() {
  return (
    <div>album</div>
  )
}

export default Album
Album.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <LayoutLibrary>
        {page}
      </LayoutLibrary>
    </Layout>
  )
}