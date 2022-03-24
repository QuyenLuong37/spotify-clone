import { useSession } from 'next-auth/react'
import React, { ReactElement, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Layout from '../../components/Layout'
import LayoutPlaylist from '../../components/LayoutPlaylist'
import useSpotify from '../../hook/useSpotify'
import { playlistsState } from '../../recoil/playlistAtom'

function Tracks() {
  const { data: session }: any = useSession()
  const spotifyApi = useSpotify()
  const [savedTracks, setTracks]: any = useState()
  const [likedSongsPlaylistUri, setLikedSongsPlaylistUri]: any = useState()
  const [playlists, setPlaylists]: any = useRecoilState(playlistsState)

  useEffect(() => {
    spotifyApi.getMySavedTracks({ limit: 50 }).then(async (res) => {
      const trackIds = res.body.items.map(item => item.track.id);
      let checkUserSavedTracks;
      if (trackIds.length) {
        checkUserSavedTracks = await spotifyApi.containsMySavedTracks(trackIds);
      }
      const result = {
        tracks: res.body.items.map((item, index) => {
          return {
            ...item,
            ...item.track,
            trackImg: item.track.album.images[0]?.url,
            isSaved: checkUserSavedTracks ? checkUserSavedTracks.body[index] : false
          }
        }),
        total: res.body.total,
      }
      setTracks(result)
    })
  }, [])

  useEffect(() => {
    if (playlists && playlists.length && savedTracks && savedTracks.tracks && savedTracks.tracks.length) {
      const checkLikedSongsExisted = playlists.find(item => item.name === 'Liked Songs') ?? null;
      if (!checkLikedSongsExisted) {
        spotifyApi.createPlaylist('Liked Songs', {description: '', public: false}).then(res => {
          setPlaylists([...playlists, res.body])
          setLikedSongsPlaylistUri(res.body.uri);
          const trackUris = savedTracks.tracks.map(item => item.uri);
          spotifyApi.addTracksToPlaylist(res.body.id, trackUris)
        })
      } else {
        console.log("🚀checkLikedSongsExisted", checkLikedSongsExisted)
        setLikedSongsPlaylistUri(checkLikedSongsExisted.uri);
      }
    }
  }, [playlists, savedTracks])
  return (
      <LayoutPlaylist
        description={null}
        followerCount={null}
        name={'Liked Songs'}
        ownerImg={session?.user?.image}
        playlistImg={null}
        tracks={savedTracks?.tracks}
        type="liked"
        uri={likedSongsPlaylistUri ? likedSongsPlaylistUri : null}
        owner={session?.user}
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