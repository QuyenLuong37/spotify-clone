import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import Layout from '../../components/Layout';
import LayoutLibrary from '../../components/LayoutLibrary';
import Track from '../../components/Track';
import useSpotify from '../../hook/useSpotify';
import { playlistIdState, playlistsState } from '../../recoil/playlistAtom';

function Playlists() {
  const playlists = useRecoilValue(playlistsState)
  const { data: session }: any = useSession()
  const spotifyApi = useSpotify()
  const router = useRouter()
  const [savedTracks, setTracks]: any = useState({})

  useEffect(() => {
    if (session) {
      spotifyApi.getMySavedTracks({ limit: 20 }).then((res) => {
        console.log("getMySavedTracks", res)
        const result = {
          tracks: res.body.items.map((item, index) => {
            return {
              ...item,
              ...item.track
            }
          }),
          total: res.body.total,
          // tracksHtml: savedTracks?.tracks?.map((item, index) => {
          //   return `<span>${item.name}</span>`
          // })?.join(' • ')
        }
        setTracks(result)
      })
    }
  }, [session])

  return (
    <div>
      <div className="text-heading text-xl xl:text-2xl 2xl:text-3xl mb-3">Playlists</div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-6'>
            <div onClick={() => router.push('/collection/tracks')} className='col-start-1 col-end-3 bg-gradient-to-tl to-[#4a12f5] from-[#8075e8] flex items-end rounded cursor-pointer'>
              <div className='p-4 space-y-2'>
                  <div className='font-medium text-gray-300 flex flex-wrap'>
                    <div className='line-clamp-3'>{savedTracks?.tracks?.map(item => item?.name)?.join(' • ')}</div>
                  </div>
                <div className="text-heading text-4xl font-bold">Liked Songs</div>
                <div className='font-bold text-base'>{savedTracks?.total === 1 ? '1 song' : savedTracks?.total + ' songs'}</div>
              </div>
            </div>
            <div onClick={() => router.push('/collection/episodes')}>
              <Track id={null} name={'Your Episodes'} images={null} artist={null} type={'episode'} uri={null} allowNavigate={false} />
            </div>
            {playlists?.map((item: any, index) => {
                return (
                  <Track key={index} id={item?.id} name={item?.name} images={item?.images} artist={item?.artists?.[0]?.name} type={item?.type} uri={item?.uri} />
                )
            })}
        </div>
    </div>
  )
}

export default Playlists
Playlists.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <LayoutLibrary>
        {page}
      </LayoutLibrary>
    </Layout>
  )
}