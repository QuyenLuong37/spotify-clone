import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import LayoutPlaylist from '../../components/LayoutPlaylist';
import useSpotify from '../../hook/useSpotify';

function Playlist() {
   const spotifyApi = useSpotify();
  const router = useRouter();
  const [playlist, setPlaylist]: any = useState();
  const {data: session}: any = useSession();
  useEffect(() => {
    const { id } = router.query;
    if (id) {
      spotifyApi.getPlaylist(id as string).then(async (res) => {
        const trackIds = res.body.tracks.items.slice(0, 50).map(item => item.track.id);
        const checkUserSavedTracks = await spotifyApi.containsMySavedTracks(trackIds);
        const playlistRes = {
          ...res.body,
          tracks: {
            items: res.body.tracks.items.map((item, index) => {
              return {
                ...item,
                ...item.track,
                trackImg: item.track.album.images[0].url,
                isSaved: checkUserSavedTracks.body[index]
              }
            })
          },
          owner: {
            ...res.body.owner,
            name: res.body.owner.display_name
          }
        }
        if (playlistRes.owner.id) {
          if (playlistRes.owner.id === session?.user?.id) {
            setPlaylist({
              ...playlistRes,
              ownerImg: [{ url: session?.user?.image }],
            })
          } else {
            spotifyApi.getUser(playlistRes.owner.id).then((user) => {
              setPlaylist({ ...playlistRes, ownerImg: user.body.images })
            })
          }
        }
      })
    }
    
  }, [router.query])
  return (
   <LayoutPlaylist
      description={playlist?.description}
      followerCount={playlist?.followers?.total}
      name={playlist?.name}
      ownerImg={playlist?.ownerImg?.[0]?.url}
      // ownerName={playlist?.owner?.display_name}
      playlistImg={playlist?.images?.[0]?.url}
      tracks={playlist?.tracks?.items}
      type="playlist"
      uri={playlist?.uri}
      owner={playlist?.owner ? [playlist?.owner] : []}
      colsVisible={['ordinal', 'title', 'album', 'added_at', 'duration']}
      trackTotal={'song'}
    />
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