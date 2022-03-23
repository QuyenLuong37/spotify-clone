import React, { ReactElement, useEffect, useState } from 'react'
import Genres from '../components/Genres'
import Header from '../components/Header'
import Layout from '../components/Layout'
import useSpotify from '../hook/useSpotify'

function Browse() {
  const spotifyApi = useSpotify()
  const [categories, setCategories] = useState([])
  useEffect(() => {
    spotifyApi.getCategories({ limit: 50, country: 'VN' }).then((res: any) => {
      setCategories(res?.body?.categories?.items ?? [])
    })
  }, [])
  return (
    <div>
      <Header />
      <div className="p-6">
          <h3 className="mb-4 text-xl font-bold text-white">Browse all</h3>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7">
            {categories &&
              categories.length > 0 &&
              categories.map((item: any, index: number) => {
                return (
                  <Genres
                    name={item?.name}
                    image={item?.icons?.[0]?.url}
                    key={index}
                    id={item?.id}
                  />
                )
              })}
          </div>
      </div>
    </div>
  )
}

export default Browse

Browse.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
