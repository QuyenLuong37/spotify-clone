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

function Episodes() {
  const { data: session }: any = useSession()
  // const [savedEpisode, setSavedEpisode]: any = useState({})
  const [savedEpisode, setSavedEpisode]: any = useRecoilState(savedEpisodeState);

  useEffect(() => {
    if (session) {
      getMySavedEpisodes(session.accessToken)
        .then((result) => {
          setSavedEpisode(result)
        })
    }
  }, [session])
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
            <MediaPlayButton uri={''} />
        </div>

        <div className='px-6'>
            {savedEpisode?.items?.map((item, index) => {
                return (
                    <EpisodeItem key={index} description={item.description} duration_ms={item.duration_ms} image={item.images[0].url} name={item.name} release_date={item.release_date} uri={item.uri} showName={item.show.name} id={item.id} position={index} />
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