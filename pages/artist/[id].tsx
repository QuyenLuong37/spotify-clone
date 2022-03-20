import { ChevronDownIcon, ChevronUpIcon,  } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import FollowButton from '../../components/FollowButton'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import MediaOptions from '../../components/MediaOptions'
import MediaPlayButton from '../../components/MediaPlayButton'
import MediaSummary from '../../components/MediaSummary'
import MediaTableRow from '../../components/MediaTableRow'
import Track from '../../components/Track'
import useSpotify from '../../hook/useSpotify'
import { isFollowingState } from '../../recoil/isFollowing'

function Artist() {
  const router = useRouter()
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [artist, setArtist]: any = useState({})
  const [isShowMore, setShowMore]: any = useState(false)
  const [artistTopTracks, setArtistTopTracks]: any = useState([])
  const [artistTopTracksLocal, setArtistTopTracksLocal]: any = useState([])
  const [artistRelatedArtists, setArtistRelatedArtists]: any = useState([])
  const [artistAlbums, setArtistAlbums]: any = useState([])
  const [isFollowing, setIsFollowing] = useRecoilState(isFollowingState)
  useEffect(() => {
    const { id } = router.query
    if (session && id) {
      spotifyApi.getArtist(id as string).then((res) => {
        
        setArtist(res.body)
      })

      spotifyApi.getArtistTopTracks(id as string, 'VN').then(async (res) => {
        const trackIds = res.body.tracks.map(item => item.id);
        const checkUserSavedTracks = await spotifyApi.containsMySavedTracks(trackIds);
        const result = res.body.tracks.map((item, index) => {
          return {
            ...item,
            artists: [],
            trackImg: item.album.images[0].url,
            isSaved: checkUserSavedTracks.body[index]
          }
        });
        setArtistTopTracks(result)
      })

      spotifyApi.getArtistRelatedArtists(id as string).then((res) => {
        
        setArtistRelatedArtists(res.body.artists)
      })

      spotifyApi.getArtistAlbums(id as string, {limit: 8}).then((res) => {
        
        setArtistAlbums(res.body.items)
      })

      spotifyApi.isFollowingArtists([id as string]).then((res) => {
        
        setIsFollowing(res.body[0]);
      })
    }
  }, [session, router.query])

  useEffect(() => {
    if (artistTopTracks && artistTopTracks.length) {
      if (isShowMore) {
        setArtistTopTracksLocal(artistTopTracks);
      } else {
        setArtistTopTracksLocal(artistTopTracks.slice(0, 5));
      }
    }
  }, [isShowMore, artistTopTracks])

  const toggleShowMore = () => {
    setShowMore(!isShowMore);
  }

  

  return (
      <div>
        <Header />
        <MediaSummary
            description={artist?.description}
            followerCount={artist?.followers?.total}
            name={artist?.name}
            ownerImg={artist?.images?.[0]?.url}
            playlistImg={artist?.images?.[0]?.url}
            trackTotal={artist?.tracks?.items?.length ?? null}
            type='artist'
            owner={[artist]}
            totalSuffix={'follower'}
        />
        <div className='flex items-center px-6 py-6 space-x-8'>
          <MediaPlayButton uri={artist?.uri} />
          <FollowButton  />

          <MediaOptions uri={artist?.uri}  />
        </div>

        <div className='px-6 flex flex-col space-y-10'>
          <div>
            <div className='text-heading-2xl mb-4'>Popular</div>
            <div>
              {artistTopTracksLocal?.map((item, index) => {
                return <MediaTableRow
                  index={index}
                  uri={item?.uri}
                  key={index}
                  track={item}
                  colsVisible={['ordinal', 'title', 'duration']}
                />
              })}
            </div>
            {artistTopTracks?.length >= 6 && (
              <div className='mt-3 font-semibold ml-6 flex items-center space-x-1 cursor-pointer text-gray-300 transition duration-200 hover:text-white' onClick={() => toggleShowMore()}>
                <span>Show {isShowMore ? 'less' : 'more'}</span>
                {isShowMore ? <ChevronUpIcon className='h-6' /> : <ChevronDownIcon className='h-6' />}
              </div>
            )}
            
          </div>

          <div>
            <div className='text-heading-2xl mb-4'>Album</div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-6'>
              {artistAlbums?.map((item, index) => {
                return <Track key={index} id={item?.id} name={item?.name} images={item?.images} artist={null}  type={item?.type} uri={item?.uri} />
              })}
            </div>
          </div>

          <div>
            <div className='text-heading-2xl mb-4'>Related artists</div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-6'>
              {artistRelatedArtists?.map((item, index) => {
                return <Track key={index} id={item?.id} name={item?.name} images={item?.images} artist={null}  type={item?.type} uri={item?.uri} />
              })}
            </div>
            
          </div>
        </div>
      </div>
  )
}

export default Artist

Artist.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}