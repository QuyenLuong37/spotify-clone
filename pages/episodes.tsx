import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
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
  return (
    <div>
        {/* <MediaSummary /> */}
    </div>
  )
}

export default episodes