import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { Dropdown, Menu, message } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilState } from 'recoil'
import useSpotify from '../hook/useSpotify'
import Artist from '../pages/collection/artists'
import { isFollowingState } from '../recoil/isFollowing'

function MediaOptions({uri}) {
    const spotifyApi = useSpotify()
    const router = useRouter()
    const [isFollowing, setIsFollowing] = useRecoilState(isFollowingState)
    const follow = () => {
        spotifyApi.followArtists([router.query.id as string]).then(res => {
        setIsFollowing(true);
        message.success({content: 'Follow successful artist'});
        })
    }

    const unfollow = () => {
        spotifyApi.unfollowArtists([router.query.id as string]).then(res => {
        setIsFollowing(false);
        message.success('Unfollow successful artist');
        })
    }
  return (
    <Dropdown overlay={(
        <Menu>
          {/* <Menu.Item>
            <div onClick={() => isFollowing ? unfollow() : follow()}>{isFollowing ? 'Unfollow' : 'Follow'}</div>
          </Menu.Item> */}
          {/* <SubMenu title="Share">
            <Menu.Item>Copy link to artist</Menu.Item>
          </SubMenu>
          <Menu.Divider /> */}
          <Menu.Item>
            <div onClick={() => window.open(uri)}>Open in Desktop app</div>
          </Menu.Item>
        </Menu>
      )} trigger={['click']}>
        <DotsHorizontalIcon className='h-6 cursor-pointer' />
      </Dropdown>
  )
}

export default MediaOptions