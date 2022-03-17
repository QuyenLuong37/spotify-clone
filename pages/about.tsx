import { getSession } from 'next-auth/react';
import React from 'react'

function about() {
    // 
  return (
    <div>about</div>
  )
}

export default about



export async function getServerSideProps() {
  const accessToken = await getSession();
  
  // const res = await getMySavedEpisodes();
  // const playlists = await res.json();
  return {
    props: { playlists: []  },
  }
}