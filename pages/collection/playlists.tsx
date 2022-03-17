import Link from 'next/link'
import React, { useState } from 'react'
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import LayoutLibrary from '../../components/LayoutLibrary';

function playlist() {
  const [tabSelected, setTabSelected] = useState('playlists');
  return (
    <LayoutLibrary>
      <div>playlist</div>
    </LayoutLibrary>
  )
}

export default playlist
