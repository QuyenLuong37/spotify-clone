import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import Layout from '../components/Layout';
import MediaSummary from '../components/MediaSummary';
import useSpotify from '../hook/useSpotify';
import { getMySavedEpisodes } from '../lib/spotify';

function episodes() {
    // const spotifyApi = useSpotify();
    const { data: session}: any = useSession();
    useEffect(() => {
        if (session) {
            getMySavedEpisodes(session.accessToken).then( res => {
                return res.json()
            }).then(res => console.log('res: ', res))
        }
    }, [session])
    let playlist;
    let ownerPlaylist;
  return (
      <Layout >
        <div className='text-white'>
            <MediaSummary description={playlist?.description} followerCount={playlist?.followers?.total} name={playlist?.name} ownerImg={ownerPlaylist?.images?.[0]?.url} ownerName={playlist?.owner?.display_name} playlistImg={playlist?.images?.[0]?.url} trackCount={playlist?.tracks?.items?.length} fromColor={'#066552'} toColor={'#1f2937'} type={'episode'} />   
        </div>
      </Layout>
  )
}

export default episodes