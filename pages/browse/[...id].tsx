import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react'
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import Track from '../../components/Track'
import useSpotify from '../../hook/useSpotify'

function Browse() {
    const spotifyApi = useSpotify();
  const router = useRouter();
  const [playlistsForCategory, setpPlaylistsForCategory]: any = useState();
  useEffect(() => {
    const { id } = router.query;
    if (id) {
      spotifyApi.getPlaylistsForCategory(id as string, {country: 'VN'}).then(res => {
          console.log("🚀playlists", res.body.playlists)
        setpPlaylistsForCategory(res.body.playlists.items);
      })
    }
    
  }, [router.query])
    
    return (
      <div>
            <Header />
            <div className='p-6'>
                <div className="text-heading text-xl xl:text-2xl 2xl:text-3xl mb-3 capitalize">{router?.query?.id ?? ''}</div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-6'>
                    {playlistsForCategory?.map((item: any, index) => {
                        return (
                            <Track key={index} id={item?.id} name={item?.name} images={item?.images} artist={item?.artists?.[0]?.name} type={item?.type} uri={item?.uri} />
                        )
                    })}
                </div>
            </div>
      </div>
    )
}

export default Browse

Browse.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}