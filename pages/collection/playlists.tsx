import React, { ReactElement, useState } from 'react'
import Layout from '../../components/Layout';
import LayoutLibrary from '../../components/LayoutLibrary';

function Playlists() {
  const [tabSelected, setTabSelected] = useState('playlists');
  return (
    <LayoutLibrary>
      <div>playlist</div>
    </LayoutLibrary>
  )
}

export default Playlists
Playlists.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}