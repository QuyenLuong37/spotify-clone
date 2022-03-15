import { DotsHorizontalIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, ChevronUpIcon,  } from '@heroicons/react/solid'
import { Button, Dropdown, Menu, message, notification } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import MediaPlayButton from '../../components/MediaPlayButton'
import MediaSummary from '../../components/MediaSummary'
import MediaTableRow from '../../components/MediaTableRow'
import Track from '../../components/Track'
import useSpotify from '../../hook/useSpotify'

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
  const [isFollowingArtists, setIsFollowingArtists] = useState(false)
  useEffect(() => {
    const { id } = router.query
    if (session && id) {
      spotifyApi.getArtist(id as string).then((res) => {
        console.log('artist: ', res.body)
        setArtist(res.body)
      })

      spotifyApi.getArtistTopTracks(id as string, 'VN').then((res) => {
        console.log('getArtistTopTracks: ', res.body)
        const result = res.body.tracks.map(item => {
          return {
            ...item,
            artists: [],
            trackImg: item.album.images[0].url
          }
        });
        setArtistTopTracks(result)
      })

      spotifyApi.getArtistRelatedArtists(id as string).then((res) => {
        console.log('getArtistRelatedArtists: ', res.body)
        setArtistRelatedArtists(res.body.artists)
      })

      spotifyApi.getArtistAlbums(id as string, {limit: 8}).then((res) => {
        console.log('getArtistAlbums: ', res.body)
        setArtistAlbums(res.body.items)
      })

      spotifyApi.isFollowingArtists([id as string]).then((res) => {
        console.log('isFollowingArtists: ', res.body)
        setIsFollowingArtists(res.body[0]);
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

  const followArtist = () => {
    spotifyApi.followArtists([router.query.id as string]).then(res => {
      console.log('followArtists: ', res);
      setIsFollowingArtists(true);
      message.success({content: 'Follow successful artist'});
      // notification['success']({
      //   message: '',
      //   description: 'Follow successful artist',
      // });
    })
  }

  const unFollowArtist = () => {
    spotifyApi.unfollowArtists([router.query.id as string]).then(res => {
      console.log('unfollowArtists: ', res);
      setIsFollowingArtists(false);
      message.success('Unfollow successful artist');
      // notification['success']({
      //   message: '',
      //   description: 'Unfollow successful artist',
      // });
    })
  }

  return (
    <Layout>
      <div>
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
          <Button onClick={() => isFollowingArtists ? unFollowArtist() : followArtist()} className='text-white hover:text-white hover:border-white' type='ghost'>{isFollowingArtists ? 'Following' : 'Follow'}</Button>

          <Dropdown overlay={(
            <Menu>
              <Menu.Item>
                <div onClick={() => isFollowingArtists ? unFollowArtist() : followArtist()}>{isFollowingArtists ? 'Unfollow' : 'Follow'}</div>
              </Menu.Item>
              <SubMenu title="Share">
                <Menu.Item>Copy link to artist</Menu.Item>
              </SubMenu>
              <Menu.Divider />
              <Menu.Item>
                <div onClick={() => window.open(artist?.uri)}>Open in Desktop app</div>
              </Menu.Item>
            </Menu>
          )} trigger={['click']}>
            <DotsHorizontalIcon className='h-6 cursor-pointer' />
          </Dropdown>
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
                  colsVisible={['title', 'duration']}
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
                return <Track key={index} id={item?.id} name={item?.name} images={item?.images} artist={null}  type={item?.type} />
              })}
            </div>
          </div>

          <div>
            <div className='text-heading-2xl mb-4'>Related artists</div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-6'>
              {artistRelatedArtists?.map((item, index) => {
                return <Track key={index} id={item?.id} name={item?.name} images={item?.images} artist={null}  type={item?.type} />
              })}
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Artist
