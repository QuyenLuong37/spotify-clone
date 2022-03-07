import { getSession } from 'next-auth/react';
import React from 'react'

function about() {
    // console.log('about: ', process.env.NEXT_PUBLIC_TEST)
  return (
    <div>about</div>
  )
}

export default about



export async function getServerSideProps() {
  const accessToken = await getSession();
  console.log('accessToken: ', accessToken);
  // const res = await getMySavedEpisodes();
  // const playlists = await res.json();
  return {
    props: { playlists: []  },
  }
}