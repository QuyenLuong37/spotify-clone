import React, { ReactElement } from 'react'
import Layout from '../components/Layout'
import PlaylistDetail from '../components/PlaylistDetail'

function Playlist() {
  return (
        <PlaylistDetail />
  )
}

export default Playlist


Playlist.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}