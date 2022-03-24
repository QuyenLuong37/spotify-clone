import { useSession } from 'next-auth/react'
import React, { ReactElement, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import EpisodeItem from '../../components/EpisodeItem'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import MediaPlayButton from '../../components/MediaPlayButton'
import MediaSummary from '../../components/MediaSummary'
import useSpotify from '../../hook/useSpotify'
import { getMySavedEpisodes } from '../../lib/spotify'
import { savedEpisodeState } from '../../recoil/episodeAtom'
import { playlistsState } from '../../recoil/playlistAtom'

function Episodes() {
  const { data: session }: any = useSession()
  const [savedEpisode, setSavedEpisode]: any = useRecoilState(savedEpisodeState);
  const [myEpisodesUri, setMyEpisodesUri]: any = useState()
  const [playlists, setPlaylists]: any = useRecoilState(playlistsState)
  const spotifyApi = useSpotify()

  useEffect(() => {
    getMySavedEpisodes(session.accessToken)
      .then((result) => {
        console.log("🚀 result", result)
        setSavedEpisode(result)
      })
  }, [])

  useEffect(() => {
    if (playlists && playlists.length && savedEpisode && savedEpisode.items && savedEpisode.items.length) {
      const checkEpisodePlaylistContainInMyPlaylist = playlists.find(item => item.name === 'Episodes') ?? null;
      if (!checkEpisodePlaylistContainInMyPlaylist) {
        spotifyApi.createPlaylist('Episodes', {description: '', public: false}).then(res => {
          setPlaylists([...playlists, res.body])
          setMyEpisodesUri(res.body.uri);
          const trackUris = savedEpisode.items.map(item => item.uri);
          spotifyApi.addTracksToPlaylist(res.body.id, trackUris)
        })
      } else {
        console.log("🚀checkLikedSongsExisted", checkEpisodePlaylistContainInMyPlaylist)
        setMyEpisodesUri(checkEpisodePlaylistContainInMyPlaylist.uri);
      }
    }
  }, [playlists, savedEpisode])
  return (
      <div>
        <Header />
        <MediaSummary
            description={null}
            followerCount={null}
            name={'Your Episodes'}
            ownerImg={session?.user?.image}
            owner={[session?.user]}
            playlistImg={null}
            trackTotal={savedEpisode?.total ?? 0}
            fromColor={'#066552'}
            toColor={'#1f2937'}
            type={'episode'}
            totalSuffix={'episode'}
        />
        <div className="px-6 py-6">
            <MediaPlayButton uri={myEpisodesUri ? myEpisodesUri : null} />
        </div>

        <div className='px-6'>
            {savedEpisode?.items?.map((item, index) => {
                return (
                    <EpisodeItem key={index} description={item.description} duration_ms={item.duration_ms} image={item.images[0].url} name={item.name} release_date={item.release_date} uri={myEpisodesUri} showName={item.show.name} id={item.id} position={index} />
                )
            })}
        </div>
      </div>
  )
}

export default Episodes


Episodes.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}