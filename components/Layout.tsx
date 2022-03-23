import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import useSpotify from '../hook/useSpotify'
import { currentTrackIsPlayingState } from '../recoil/currentTrackAtom'
import { playerState } from '../recoil/playerAtom'
import Sidebar from './Sidebar'
import WebPlayback from './WebPlayback'

function Layout({ children }) {
  const { data: session }: any = useSession()
  const spotifyApi = useSpotify();
  const [player, setPlayer] = useRecoilState(playerState);
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackIsPlayingState);
  const [loadFirst, setLoadFirst] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    if (session && loadFirst) {
      const script = document.createElement('script')
      script.src = 'https://sdk.scdn.co/spotify-player.js'
      script.async = true

      document.body.appendChild(script)
      ;(window as any).onSpotifyWebPlaybackSDKReady = async () => {
        const player = new (window as any).Spotify.Player({
          name: 'May cua Quyen',
          getOAuthToken: (cb) => {
            cb(session.accessToken)
          }
        })

        player.addListener('ready', ({ device_id }) => {
          
          spotifyApi.transferMyPlayback([device_id])
        })

        player.addListener('not_ready', ({ device_id }) => {
          
        })

        player.addListener('player_state_changed', (state) => {
          if (!state) {
            return
          }
          setCurrentTrack(state);
          const volume = localStorage.getItem('volume');
          player.setVolume(volume ? +volume : .5);
        })
        
        player.connect().then((success) => {
          if (success) {
            setPlayer(player)
          }
        })
      }
      setLoadFirst(false)
    }
  }, [session, loadFirst])

  if (!session) {
    router.push('/login')
    return <></>;
  }

  return (
    <>
      <div className="layout grid">
        <div className="nav-bar">
          <Sidebar />
        </div>
        <div className="main-view h-[calc(100vh-105px)] overflow-hidden bg-gradient-to-r from-[#2e2e2e] to-[#2e2e2e]">
          <div className="pb-6 overflow-auto h-full">
            {{ ...children }}
          </div>
        </div>

        <div className="now-playing-bar sticky bottom-0 left-0 right-0">
          <WebPlayback />
        </div>
      </div>
    </>
  )
}

export default Layout
