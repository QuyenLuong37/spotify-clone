import React, { ReactElement, useState } from 'react'
import { useRecoilValue } from 'recoil';
import Layout from '../../components/Layout';
import LayoutLibrary from '../../components/LayoutLibrary';
import Track from '../../components/Track';
import { playlistsState } from '../../recoil/playlistAtom';

function Playlists() {
  const playlists = useRecoilValue(playlistsState)
  return (
    <div>
      <div className="text-heading text-xl mb-3">Playlists</div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-6'>
            <div className='col-start-1 col-end-3 bg-gradient-to-t to-purple-400 from-purple-500 flex items-end rounded'>
              <div className="text-heading text-4xl font-bold p-4">Liked Songs</div>
              <div className='font-bold'>72 songs</div>
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