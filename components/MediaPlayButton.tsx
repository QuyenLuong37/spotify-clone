import React from 'react'
import useSpotify from '../hook/useSpotify'
import Icon from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import { currentTrackIsPlayingState } from '../recoil/currentTrackAtom'
import { playerState } from '../recoil/playerAtom'

const PauseSvg = () => (
  <svg fill="#ffffff" role="img" height="24" width="24" viewBox="0 0 24 24">
    <path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path>
  </svg>
)

const PlaySvg = () => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="#ffffff"
    height="100%"
    width="100%"
    preserveAspectRatio="xMidYMid meet"
    focusable="false"
  >
    <path d="M4.018 14L14.41 8 4.018 2z"></path>
  </svg>
)

const PlayIcon = (props) => <Icon component={PlaySvg} {...props} />
const PauseIcon = (props) => <Icon component={PauseSvg} {...props} />

function MediaPlayButton({ uri }) {
  const spotifyApi = useSpotify()
  const currentTrack: any = useRecoilValue(currentTrackIsPlayingState)
  const player: any = useRecoilValue(playerState)
  const play = () => {
    spotifyApi.play({ context_uri: uri, position_ms:  currentTrack?.position}).then((res) => {})
  }
  const pause = () => {
    spotifyApi.pause().then((res) => {})
  }
  return (
      <div onClick={() => currentTrack?.context?.uri === uri && !currentTrack?.paused ? pause() : play()} className="flex h-10 w-10 2xl:h-12 2xl:w-12 transform cursor-pointer items-center justify-center rounded-full bg-green-400 p-3 text-white transition duration-150 hover:scale-110">
        {currentTrack?.context?.uri === uri && !currentTrack?.paused ? (
          <PauseIcon onClick={() => pause()} />
        ) : (
          <PlayIcon onClick={() => play()}  />
        )}
      </div>
  )
}

export default MediaPlayButton
