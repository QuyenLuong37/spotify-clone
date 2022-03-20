import { Button, message } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilState } from 'recoil'
import useSpotify from '../hook/useSpotify'
import { isFollowingState } from '../recoil/isFollowing'

function FollowButton() {
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
        <Button onClick={() => isFollowing ? unfollow() : follow()} className='text-white hover:text-white hover:border-white' type='ghost'>{isFollowing ? 'Following' : 'Follow'}</Button>
    )
}

export default FollowButton