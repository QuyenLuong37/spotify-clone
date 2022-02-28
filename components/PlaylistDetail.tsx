import { ChevronDownIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import useSpotify from '../hook/useSpotify'
import { playlistIdState, savedTrackState } from '../recoil/playlistAtom'
import Layout from './Layout'
import WebPlayback from './WebPlayback'

function PlaylistDetail() {
  const { data: session, status }: any = useSession()
  const spotifyApi = useSpotify()
  const playlistId = useRecoilValue(playlistIdState)
  const isSelectSavedTrack = useRecoilValue(savedTrackState)
  const [playlist, setPlaylist]: any = useState(null)
  const [ownerPlaylist, setOwnerPlaylist]: any = useState(null)
  useEffect(() => {
    if (playlistId) {
      spotifyApi.getPlaylist(playlistId).then((res) => {
        setPlaylist(res.body)
        if (res?.body?.owner?.id) {
          spotifyApi.getUser(res.body.owner.id).then((res) => {
            setOwnerPlaylist(res.body)
          })
        }
      })
    }
  }, [playlistId])

  useEffect(() => {
    if (isSelectSavedTrack) {
      spotifyApi.getMySavedTracks().then((res) => {
        console.log('getMySavedTracks: ', res.body)
        setPlaylist(res.body)
      })
    }
  }, [isSelectSavedTrack])

  const playPlayList = () => {
    spotifyApi.play({context_uri: playlist?.uri}).then(res => {
      console.log('playPlayList: ', playPlayList);
    })
  }
  return (
    <div className="text-white">
      <section className="flex h-80 items-end space-x-4 bg-gradient-to-b from-red-500 to-black p-4">
        <img className="h-56" src={playlist?.images?.[0]?.url} alt="" />
        <div className="space-y-2">
          <div className="font-medium">Playlist</div>
          <div className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            {playlist?.name}
          </div>
          <div className="text-sm text-gray-400">{playlist?.description} </div>

          <div className="flex space-x-2 text-gray-400">
            <img
              src={ownerPlaylist?.images?.[0]?.url}
              className="h-6 rounded-full"
              alt=""
            />
            <div className="flex items-center space-x-2 text-xs sm:text-sm">
              <span className="font-semibold text-white">
                {playlist?.owner?.display_name}
              </span>
              <span> - </span>
              <span>{playlist?.followers?.total} likes</span>
              <span> - </span>
              <span> {playlist?.tracks?.items?.length ?? 0} songs</span>
            </div>
          </div>
        </div>
      </section>

      <div className="p-4">
        <div onClick={() => playPlayList()} className="cursor-pointer w-14 h-1w-14 p-2 transition duration-150 hover:scale-105 text-white rounded-full bg-green-400 flex items-center justify-center">
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M4.018 14L14.41 8 4.018 2z"></path></svg>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {session && (
          <button
            onClick={() => signOut()}
            className="cursor-pointer  rounded bg-gray-400 px-4 py-1"
          >
            Sign out
          </button>
        )}

        {!session && (
          <div>
            <button
              onClick={() => signIn()}
              className="cursor-pointer  rounded bg-gray-400 px-4 py-1"
            >
              Sign in
            </button>
          </div>
        )}
      </div>
{/*       
      <div className="p-3">
        <div>
          <h2 className="text-2xl font-semibold">Good afternoon</h2>

          <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
            <div className="cursor-pointer  rounded bg-[#2d293b] p-3 transition duration-200 hover:bg-[#656175]">
              Liked Songs
            </div>
            <div className="cursor-pointer  rounded bg-[#2d293b] p-3 transition duration-200 hover:bg-[#656175]">
              Lên nóc nhà
            </div>
            <div className="cursor-pointer  rounded bg-[#2d293b] p-3 transition duration-200 hover:bg-[#656175]">
              Nhạc remix{' '}
            </div>
            <div className="cursor-pointer  rounded bg-[#2d293b] p-3 transition duration-200 hover:bg-[#656175]">
              Mega hit
            </div>
          </div>
        </div>
      </div> */}
    
    </div>
  )
}

export default PlaylistDetail
