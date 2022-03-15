import { Avatar, List, message } from 'antd';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Layout from '../../components/Layout';
import LayoutPlaylist from '../../components/LayoutPlaylist';
import MediaSummary from '../../components/MediaSummary'
import useSpotify from '../../hook/useSpotify';
import VirtualList from 'rc-virtual-list';

function tracks() {
  const { data: session }: any = useSession()
  const spotifyWebApi = useSpotify()
  const [savedTracks, setTracks]: any = useState({});

  useEffect(() => {
      if (session) {
          spotifyWebApi.getMySavedTracks({limit: 50}).then(res => {
              console.log('getMySavedTracks: ', res);
              const result = {
                  tracks: res.body.items.map(item => {
                    return {
                      ...item,
                      ...item.track,
                      trackImg: item.track.album.images[0]?.url
                    }
                  }),
                  total: res.body.total
              }
              setTracks(result);
          }) 
      }
  }, [session])
  return (
    <Layout >
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
                colsVisible={['title', 'album', 'added_at', 'duration']}
            />
      </Layout>
  )
}

export default tracks