import { useSession } from 'next-auth/react'
import React, { ReactElement, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import LayoutPlaylist from '../../components/LayoutPlaylist'
import useSpotify from '../../hook/useSpotify'

function Tracks() {
  const { data: session }: any = useSession()
  const spotifyApi = useSpotify()
  const [savedTracks, setTracks]: any = useState({})

  useEffect(() => {
    if (session) {
      spotifyApi.getMySavedTracks({ limit: 50 }).then(async (res) => {
        const trackIds = res.body.items.map(item => item.track.id);
        const checkUserSavedTracks = await spotifyApi.containsMySavedTracks(trackIds);
        const result = {
          tracks: res.body.items.map((item, index) => {
            return {
              ...item,
              ...item.track,
              trackImg: item.track.album.images[0]?.url,
              isSaved: checkUserSavedTracks.body[index]
            }
          }),
          total: res.body.total,
        }
        setTracks(result)
      })
    }
  }, [session])
  return (
      <LayoutPlaylist
        description={null}
        followerCount={null}
        name={'Liked Songs'}
        ownerImg={session?.user?.image}
        playlistImg={null}
        tracks={savedTracks?.tracks}
        type="liked"
        uri={''}
        owner={[session?.user]}
        trackTotal={savedTracks?.total ?? 0}
        colsVisible={['ordinal', 'title', 'album', 'added_at', 'duration']}
      />
  )
}

export default Tracks


Tracks.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}