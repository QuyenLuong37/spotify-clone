import { DotsHorizontalIcon, HeartIcon } from '@heroicons/react/outline'
import { ClockIcon, MusicNoteIcon, PauseIcon, PlayIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import useSpotify from '../hook/useSpotify'
import { currentTrackIsPlayingState } from '../recoil/currentTrackAtom'
import { playlistIdState } from '../recoil/playlistAtom'
import { format } from 'date-fns';

function PlaylistDetail() {
  const { data: session, status }: any = useSession()
  const spotifyApi = useSpotify()
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist]: any = useState(null)
  const [trackSelected, setTrackSelected]: any = useState(null)
  const [ownerPlaylist, setOwnerPlaylist]: any = useState(null)
  const currentTrackIsPlaying: any = useRecoilValue(currentTrackIsPlayingState);
  console.log('currentTrackIsPlaying: ', currentTrackIsPlaying);
  useEffect(() => {
    if (playlistId) {
      spotifyApi.getPlaylist(playlistId).then((res) => {
        console.log('play list: ', res.body);
        setPlaylist(res.body)
        if (res?.body?.owner?.id) {
          if (res?.body?.owner?.id === session?.user?.id) {
            setOwnerPlaylist({images: [{url: session?.user?.image}]})
          } else {
            spotifyApi.getUser(res.body.owner.id).then((res) => {
              setOwnerPlaylist(res.body)
            })
          }
        }
      })
    }
  }, [playlistId])

  const playTrackInPlaylist = (e, track, index) => {
    e.stopPropagation();
    spotifyApi.play({context_uri: playlist?.uri, offset: {position: index}, position_ms: 10000}).then(res => {
      console.log('res: ', res);
    })
  }

  const playPlayList = () => {
    spotifyApi.play({context_uri: playlist?.uri}).then(res => {
    })
  }

  const pausePlayback = () => {
    spotifyApi.pause().then(res => {
      console.log('pause res: ', res);
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

      <div className="">
        <div className="px-8 py-6">
          <div onClick={() => playPlayList()} className="cursor-pointer w-12 h-12 p-3 transition duration-150 transform hover:scale-110 text-white rounded-full bg-green-400 flex items-center justify-center">
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M4.018 14L14.41 8 4.018 2z"></path></svg>
          </div>
        </div>

        <div className='text-gray-400 px-5 space-y-3'>
          <div className="uppercase text-sm font-medium grid grid-cols-[[index]_40px_[first]_6fr_[var1]_4fr_[var2]_3fr_[last]_minmax(120px,1fr)] gap-4 items-center px-4 border-b border-gray-700 pb-4">
            <div className="flex justify-center">#</div>
            <div>Title</div>
            <div>Album</div>
            <div>Date Added</div>
            <div className="flex justify-center"><ClockIcon className='h-5' /></div>
          </div>
          {
            playlist?.tracks?.items?.map((item, index) => {
              return (
                <div key={index} onClick={() => setTrackSelected(item?.track?.id)} className={trackSelected === item?.track?.id ? 'bg-gray-800 text-white' : 'bg-transparent'}>
                  <div  className="grid grid-cols-[[index]_40px_[first]_6fr_[var1]_4fr_[var2]_3fr_[last]_minmax(120px,1fr)] gap-4 items-center h-14 cursor-pointer transition duration-300 hover:bg-gray-800 hover:text-white group rounded px-4 border border-transparent"  >
                    <div className="flex justify-center">
                      {((item?.track?.id === currentTrackIsPlaying?.id  || item?.track?.id === currentTrackIsPlaying?.linked_from?.id) && currentTrackIsPlaying?.paused === false) && (
                        <>
                          <MusicNoteIcon className={((item?.track?.id === currentTrackIsPlaying?.id  || item?.track?.id === currentTrackIsPlaying?.linked_from?.id) && trackSelected !== item?.track?.id) ? 'h-6 text-green-500 group-hover:hidden' : 'hidden'} />

                          <PauseIcon onClick={() => pausePlayback()} className={trackSelected === item?.track?.id ? 'group-hover:block h-7' : 'hidden group-hover:block h-7'} />
                        </>
                      )}
                      {((item?.track?.id !== currentTrackIsPlaying?.id && item?.track?.id !== currentTrackIsPlaying?.linked_from?.id) || currentTrackIsPlaying?.paused === true) && (
                        <>
                        <PlayIcon onClick={(e) => {playTrackInPlaylist(e, item?.track, index)}} className={trackSelected === item?.track?.id ? 'h-7' : 'h-7 hidden group-hover:inline-block'}/>
                        <span className={trackSelected === item?.track?.id ? 'hidden' : ((item?.track?.id === currentTrackIsPlaying?.id  || item?.track?.id === currentTrackIsPlaying?.linked_from?.id) ) ? 'group-hover:hidden text-green-500' : 'group-hover:hidden'}>{index + 1}</span></>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <img src={item?.track?.album?.images[0]?.url} className="w-10 h-10" alt="" />
                        <div>
                          <div className={(item?.track?.id === currentTrackIsPlaying?.id  || item?.track?.id === currentTrackIsPlaying?.linked_from?.id) ? 'text-green-500 font-semibold text-sm' : 'text-white font-semibold text-sm'}>{item?.track?.name}</div>
                          <div className='text-sm'>{item?.track?.artists?.[0].name}</div>
                        </div>
                      </div>
                    </div>
                    <div className='text-sm'>{item?.track?.album?.name}</div>
                    <div className='text-sm'>{format(new Date(item?.added_at), 'MMM, dd yyyy')}</div>
                    <div className='text-sm flex justify-center'>
                      <div className="flex items-center">
                        <HeartIcon  className={trackSelected === item?.track?.id ? 'h-5 cursor-pointer mr-4' : 'hidden group-hover:block h-5 cursor-pointer mr-4'} />
                        <div>{item?.track?.duration_ms}</div>
                        <DotsHorizontalIcon  className={trackSelected === item?.track?.id ? 'h-5 cursor-pointer ml-4' : 'hidden group-hover:block h-5 cursor-pointer ml-4'} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
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
