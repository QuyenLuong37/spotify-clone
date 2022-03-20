import React, { ReactElement } from 'react'
import Layout from '../../components/Layout'
import LayoutLibrary from '../../components/LayoutLibrary'

function Artist() {
  return (
    <LayoutLibrary>
      <div>artist</div>
    </LayoutLibrary>
  )
}

export default Artist


Artist.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}