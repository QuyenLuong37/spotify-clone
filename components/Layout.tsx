import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Sidebar from './Sidebar'
import WebPlayback from './WebPlayback'
import { Button, Dropdown, Menu, Popover } from 'antd'
import useSpotify from '../hook/useSpotify'
import { LeftOutlined } from '@ant-design/icons';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/outline'
import InfiniteScroll from 'react-infinite-scroll-component'

function Layout({ children }) {
  const { data: session }: any = useSession()
  const spotifyApi = useSpotify()

  const prevScrollY = useRef(0)

  const [goingUp, setGoingUp] = useState(false)
  const [items, setItems]: any = useState(Array.from({ length: 20 }));

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false)
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true)
      }

      prevScrollY.current = currentScrollY
      console.log(goingUp, currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [goingUp])

  // useEffect(() => {
  //   if (session) {

  //     const script = document.createElement('script')
  //     script.src = 'https://sdk.scdn.co/spotify-player.js'
  //     script.async = true

  //     document.body.appendChild(script)
  //     ;(window as any).onSpotifyWebPlaybackSDKReady = async () => {
  //       const player = new (window as any).Spotify.Player({
  //         name: 'May cua Quyen',
  //         getOAuthToken: (cb) => {
  //           cb(session.accessToken)
  //         },
  //         // volume: 0.5,
  //       })
  //       // setPlayer(player)

  //       player.addListener('ready', ({ device_id }) => {
  //         console.log('Ready with Device ID', device_id)
  //         spotifyApi.transferMyPlayback([device_id]).then(
  //           (res) => {
  //             console.log('transferMyPlayback: ', res)
  //           },
  //           (err) => {
  //             //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
  //             console.log('Something went wrong!', err)
  //           }
  //         )
  //       })

  //       player.addListener('not_ready', ({ device_id }) => {
  //         console.log('Device ID has gone offline', device_id)
  //       })

  //       player.addListener('player_state_changed', (state) => {
  //         if (!state) {
  //           return
  //         }
  //         // console.log('current_track: ', state)
  //         const volume = localStorage.getItem('volume');
  //         player.setVolume(volume ? +volume : .5).then(volume => {
  //         })
  //         // setCurrentTrackIsPlaying({...state.track_window.current_track, paused: state.paused, duration: state.duration});
  //         // setPaused(state.paused)
  //         // setShuffle(state.shuffle);
  //         // setRepeatMode(state.repeat_mode);
  //         // // player.seek(Math.floor(state.position / 1000))
  //         // setPosition(state.position)

  //         // player.getCurrentState().then((a) => {
  //         //   !state ? setActive(false) : setActive(true)
  //         // })
  //       })

  //       player.connect().then((success) => {
  //         if (success) {
  //           console.log('The Web Playback SDK successfully connected to Spotify!')
  //         }
  //       })
  //     }
  //   }
  // }, [session])

  const profile = (
    <div>
      <p>Profile</p>
      <p onClick={() => signOut()}>Sign out</p>
    </div>
  )
  if (!session) {
    return null
  }
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <p >Profile</p>
      </Menu.Item>
      <Menu.Item key="1">
      <p onClick={() => signOut()}>Sign out</p>
      </Menu.Item>
    </Menu>
  );

  
  // const fetchMoreData: any = () => {
  //   console.log('fet more');
  //   setTimeout(() => {
  //     setItems(items.concat(Array.from({ length: 20 })))
  //   }, 1500);
  // }

  // const handleScroll = (e) => {
  //     console.log('scroll: ', e);;
      
  // }
  return (
    <>
      <div className="layout grid">
        <div className="nav-bar">
          <Sidebar />
        </div>
        <div className="main-view h-[calc(100vh-90px)] overflow-hidden bg-gradient-to-r from-[#2e2e2e] to-[#2e2e2e]">
          <header className="sticky top-0 z-10 flex cursor-pointer justify-between bg-[#2e2e2e] p-4 text-white shadow-sm">

            <div className="flex  space-x-3">
              <div onClick={() => window.history.back()} className="h-8 w-8 rounded-full flex justify-center items-center bg-gray-900 transition duration-200 hover:bg-black">
                <ChevronLeftIcon className='h-5' />
              </div>

              <div onClick={() => window.history.forward()} className="h-8 w-8 rounded-full flex justify-center items-center bg-gray-900 transition duration-200 hover:bg-black">
                <ChevronRightIcon className='h-5' />
              </div>
            </div>

            <Dropdown overlay={menu} trigger={['click']}>
              <div className="flex items-center space-x-2 rounded-3xl  bg-[#545454] h-10 px-2">
                <img
                  src={session?.user?.image}
                  className="h-7 rounded-full"
                  alt=""
                />
                <span className="text-sm font-bold">{session?.user?.name}</span>
                <ChevronDownIcon className="h-6" />
              </div>
            </Dropdown>
            
          </header>
          <div className="pb-6 overflow-auto" style={{height: 'calc(100vh - 162px)'}}>
            {{ ...children }}
          </div>
        </div>

        {/* <div className="now-playing-bar sticky bottom-0 left-0 right-0">
          <WebPlayback accessToken={session.accessToken} />
        </div> */}
      </div>
    </>
  )
}

export default Layout
