import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import Layout from '../../components/Layout';
import LayoutLibrary from '../../components/LayoutLibrary';
import Track from '../../components/Track';
import useSpotify from '../../hook/useSpotify';
import { getMySavedEpisodes } from '../../lib/spotify';
import { playlistsState } from '../../recoil/playlistAtom';

function Podcast() {
  const { data: session }: any = useSession()
  const spotifyApi = useSpotify()
  const router = useRouter()
  const [shows, setShows]: any = useState([])
  const [savedEpisode, setSavedEpisode]: any = useState([])

  useEffect(() => {
    spotifyApi.getMySavedShows().then(res => {
      setShows(res.body.items.map(item => ({...item, ...item.show})))
    })

    getMySavedEpisodes(session.accessToken).then((res) => {
      
      setSavedEpisode(res)
    })
  }, [])
  
  return (
    <div>
      <div className="text-heading text-xl xl:text-2xl 2xl:text-3xl mb-3">Episodes</div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-6'>
            <div onClick={() => router.push('/collection/episodes')} className='col-start-1 col-end-3 bg-gradient-to-tl to-[#00644e] from-[#1e886c] flex items-end rounded cursor-pointer'>
              <div className='p-4 space-y-2'>
                  <div className='font-medium text-gray-300 flex flex-wrap'>
                    <div className='line-clamp-3'>{savedEpisode?.items?.map(item => item?.name)?.join(' • ')}</div>
                  </div>
                <div className="text-heading text-4xl font-bold">Your episodes</div>
                <div className='font-bold text-base'>{savedEpisode?.total === 1 ? '1 episode' : savedEpisode?.total + ' episodes'}</div>
              </div>
            </div>
            {shows?.map((item: any, index) => {
                return (
                  <Track key={index} id={item?.id} name={item?.name} images={item?.images} artist={item?.artists?.[0]?.name} type={item?.type} uri={item?.uri} />
                )
            })}
        </div>
    </div>
  )
}

export default Podcast

Podcast.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <LayoutLibrary>
        {page}
      </LayoutLibrary>
    </Layout>
  )
}