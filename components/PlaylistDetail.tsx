import { DotsHorizontalIcon, HeartIcon } from '@heroicons/react/outline'
import { ClockIcon, MusicNoteIcon, PlayIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import useSpotify from '../hook/useSpotify'
import { playlistIdState } from '../recoil/playlistAtom'

function PlaylistDetail() {
  const { data: session, status }: any = useSession()
  const spotifyApi = useSpotify()
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist]: any = useState(null)
  const [trackSelected, setTrackSelected]: any = useState(null)
  const [trackIsPlaying, setTrackIsPlaying]: any = useState(null)
  const [ownerPlaylist, setOwnerPlaylist]: any = useState(null)
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
              console.log('owner: ', res.body)
              setOwnerPlaylist(res.body)
            })
          }
        }
      })
    }
  }, [playlistId])

  const playTrackInPlaylist = (index) => {
    setTrackIsPlaying(index);
    spotifyApi.play({context_uri: playlist?.uri, offset: {position: index}, position_ms: 2000}).then(res => {
      console.log('playTrackInPlaylist: ', res);
    })
  }

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
        <div onClick={() => playPlayList()} className="cursor-pointer w-12 h-12 p-3 transition duration-150 transform hover:scale-110 text-white rounded-full bg-green-400 flex items-center justify-center">
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M4.018 14L14.41 8 4.018 2z"></path></svg>
        </div>

        <div className='text-gray-400 mt-6 space-y-3'>
          <div className="flex items-center uppercase text-sm font-medium pb-4">
            <div className='basis-20 flex justify-center'>#</div>
            <div className='basis-1/3'>Title</div>
            <div className='basis-1/4'>Album</div>
            <div className='basis-1/4'>Date Added</div>
            <div className='basis-1/5 flex justify-center'><ClockIcon className='h-5' /></div>
          </div>
          {
            playlist?.tracks?.items?.map((item, index) => {
              return (
                <div key={index} onClick={() => setTrackSelected(item?.track?.id)} className={trackSelected === item?.track?.id ? 'bg-gray-800 text-white' : 'bg-transparent'}>
                  <div  className="flex items-center cursor-pointer transition duration-300 hover:bg-gray-800 hover:text-white group py-2 rounded "  >
                    <div className='basis-20 flex justify-center'>
                      {trackIsPlaying === index && (
                        <MusicNoteIcon className={trackIsPlaying === index ? 'h-6 text-green-500' : 'hidden'} />
                      )}
                      {trackIsPlaying !== index && (
                        <>
                        <PlayIcon onClick={() => {playTrackInPlaylist(index)}} className={trackSelected === item?.track?.id ? 'h-7' : 'h-7 hidden group-hover:inline-block'}/>
                        <span className={trackSelected === item?.track?.id ? 'hidden' : ' group-hover:hidden'}>{index + 1}</span></>
                      )}
                    </div>
                    <div className='basis-1/3 '>
                      <div className="flex items-center space-x-3">
                        <img src={item?.track?.album?.images[0]?.url} className="w-12 h-12" alt="" />
                        <div>
                          <div className={trackIsPlaying === index ? 'text-green-500 font-semibold' : 'text-white font-semibold'}>{item?.track?.name}</div>
                          <div className='text-sm'>{item?.track?.artists?.[0].name}</div>
                        </div>
                      </div>
                    </div>
                    <div className='basis-1/4'>{item?.track?.album?.name}</div>
                    <div className='basis-1/4'>{item?.added_at}</div>
                    <div className='basis-1/5 flex justify-center'>
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
