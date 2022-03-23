import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react'
import EpisodeItem from '../../components/EpisodeItem';
import Header from '../../components/Header'
import Layout from '../../components/Layout';
import MediaOptions from '../../components/MediaOptions';
import MediaPlayButton from '../../components/MediaPlayButton';
import MediaSummary from '../../components/MediaSummary'
import useSpotify from '../../hook/useSpotify';
import Playlist from '../playlist';

function Show() {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const [show, setShow]: any = useState();
  const [showEpisodes, setShowEpisodes]: any = useState([]);
  useEffect(() => {
    const { id } = router.query;
    if (id) {
      spotifyApi.getShow(id as string).then(res => {
        setShow(res.body);
      })

      spotifyApi.getShowEpisodes(id as string, {limit: 50}).then(res => {
        
        setShowEpisodes(res.body);
      })
    }
    
  }, [router.query])
  return (
    <div>
      <Header />

      <MediaSummary
          description={show?.description}
          followerCount={null}
          name={show?.name}
          ownerImg={null}
          playlistImg={show?.images?.[0]?.url}
          trackTotal={null}
          type='podcast'
          owner={[{name: show?.publisher}]}
          totalSuffix={null}
      />
      <div className='flex items-center px-6 py-6 space-x-8'>
        <MediaPlayButton uri={show?.uri} />
        {/* <FollowButton  /> */}

        <MediaOptions uri={show?.uri}  />
      </div>

      <div className='px-6'>
        {showEpisodes?.items?.length > 0 && showEpisodes?.items?.map((item, index) => {
          return <EpisodeItem key={index} description={item.description} duration_ms={item.duration_ms} image={item.images[0].url} name={item.name} release_date={item.release_date} uri={show?.uri} showName={show?.name} id={item.id} position={showEpisodes.total - (index + 1)} />
        })}
      </div>
    </div>
  )
}

export default Show


Show.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}