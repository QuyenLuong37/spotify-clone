import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import MediaSummary from '../../components/MediaSummary'
import useSpotify from '../../hook/useSpotify';

function tracks() {
  const { data: session, status }: any = useSession()
  const spotifyWebApi = useSpotify()
  const [savedTrack, setTracks]: any = useState({});
  console.log('data:   ', session)
  let  playlist;
  let  ownerPlaylist;

  useEffect(() => {
      if (session) {
          spotifyWebApi.getMySavedTracks().then(res => {
              console.log('getMySavedTracks: ', res);
              setTracks(res.body);
          }) 
      }
  }, [session])
  
  return (
    <Layout >
        <div className='text-white'>
            <MediaSummary description={playlist?.description} followerCount={playlist?.followers?.total} name={'Liked Songs'} ownerImg={session?.user?.image} ownerName={session?.user?.name} playlistImg={playlist?.images?.[0]?.url} trackCount={savedTrack?.total} fromColor={'#066552'} toColor={'#1f2937'} type={'liked'} />   
        </div>
      </Layout>
  )
}

export default tracks