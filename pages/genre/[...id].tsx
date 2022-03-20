import React, { ReactElement } from 'react'
import Layout from '../../components/Layout'

function Genre() {
  return (
    <div>Genre</div>
  )
}

export default Genre

Genre.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}