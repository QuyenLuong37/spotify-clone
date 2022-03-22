import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import LayoutLibrary from '../../components/LayoutLibrary'
import Track from '../../components/Track'
import useSpotify from '../../hook/useSpotify'
import { getMySavedEpisodes } from '../../lib/spotify'

function Artist() {
  const spotifyApi = useSpotify()
  const [artists, setArtists]: any = useState([])

  useEffect(() => {
    spotifyApi.getFollowedArtists().then(res => {
      
      setArtists(res.body.artists.items)
    })
  }, [])
  
  return (
    <div>
      <div className="text-heading text-xl xl:text-2xl 2xl:text-3xl mb-3">Artists</div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-6'>
            {artists?.map((item: any, index) => {
                return (
                  <Track key={index} id={item?.id} name={item?.name} images={item?.images} artist={item?.artists?.[0]?.name} type={item?.type} uri={item?.uri} />
                )
            })}
        </div>
    </div>
  )
}

export default Artist


Artist.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <LayoutLibrary>
        {page}
      </LayoutLibrary>
    </Layout>
  )
}