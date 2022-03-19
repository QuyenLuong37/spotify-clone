import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import useSpotify from '../hook/useSpotify'
import { playlistIdState } from '../recoil/playlistAtom'
import LayoutPlaylist from './LayoutPlaylist'

function PlaylistDetail() {
  const { data: session, status }: any = useSession()
  const spotifyApi = useSpotify()
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist]: any = useState(null)
  useEffect(() => {
    if (session && playlistId) {
      spotifyApi.getPlaylist(playlistId).then(async (res) => {
        const trackIds = res.body.tracks.items.map(item => item.track.id);
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
  }, [session, playlistId])

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

export default PlaylistDetail