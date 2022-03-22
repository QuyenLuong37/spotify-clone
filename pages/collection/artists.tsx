import React, { ReactElement } from 'react'
import Layout from '../../components/Layout'
import LayoutLibrary from '../../components/LayoutLibrary'

function Artist() {
  return (
      <div>artist</div>
  )
}

export default Artist


Artist.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <LayoutLibrary>
        {page}
      </LayoutLibrary>
    </Layout>
  )
}