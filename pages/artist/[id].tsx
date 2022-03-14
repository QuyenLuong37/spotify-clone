import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import LayoutPlaylist from '../../components/LayoutPlaylist'
import MediaPlayButton from '../../components/MediaPlayButton'
import MediaSummary from '../../components/MediaSummary'
import MediaTableRow from '../../components/MediaTableRow'
import useSpotify from '../../hook/useSpotify'

function Artist() {
  const router = useRouter()
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [artist, setArtist]: any = useState({})
  const [artistTopTracks, setArtistTopTracks]: any = useState([])
  const [artistRelatedArtists, setArtistRelatedArtists]: any = useState({})
  const [artistAlbums, setArtistAlbums]: any = useState({})
  useEffect(() => {
    const { id } = router.query
    if (session && id) {
      spotifyApi.getArtist(id as string).then((res) => {
        console.log('artist: ', res.body)
        setArtist(res.body)
      })

      spotifyApi.getArtistTopTracks(id as string, 'VN').then((res) => {
        console.log('getArtistTopTracks: ', res.body)
        setArtistTopTracks(res.body.tracks)
      })

      spotifyApi.getArtistRelatedArtists(id as string).then((res) => {
        console.log('getArtistRelatedArtists: ', res.body)
        setArtistRelatedArtists(res.body)
      })

      spotifyApi.getArtistAlbums(id as string).then((res) => {
        console.log('getArtistAlbums: ', res.body)
        setArtistAlbums(res.body)
      })
    }
  }, [session, router.query])
  return (
    <Layout>
      <div>
        <MediaSummary
            description={artist?.description}
            followerCount={artist?.followers?.total}
            name={artist?.name}
            ownerImg={artist?.images?.[0]?.url}
            playlistImg={artist?.images?.[0]?.url}
            trackCount={artist?.tracks?.items?.length ?? null}
            type='artist'
            owner={[artist]}
        />
        <MediaPlayButton uri={artist?.uri} />

        <div>
          <div className='text-heading mb-2'>Popular</div>
          <div>
            {artistTopTracks?.map((item, index) => {
              return <MediaTableRow
                index={index}
                uri={item?.uri}
                key={index}
                track={item}
                colsVisible={['title', 'duration']}
              />
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Artist
