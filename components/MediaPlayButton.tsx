import React from 'react'
import useSpotify from '../hook/useSpotify'
import Icon from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import { currentTrackIsPlayingState } from '../recoil/currentTrackAtom'

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
  const play = (e) => {
    e.stopPropagation();
    console.log("🚀 currentTrack", currentTrack)
    console.log("🚀 uri", uri)
    spotifyApi.play({ context_uri: uri, position_ms:  currentTrack?.context?.uri === uri ? currentTrack?.position : 0});
  }
  const pause = (e) => {
    e.stopPropagation();
    spotifyApi.pause();
  }
  return (
      <div onClick={(e) => currentTrack?.context?.uri === uri && !currentTrack?.paused ? pause(e) : play(e)} className="flex h-11 w-11 2xl:h-14 2xl:w-14 transform cursor-pointer items-center justify-center rounded-full bg-green-400 p-3 text-white transition duration-150 hover:scale-110 shadow-lg">
        {currentTrack?.context?.uri === uri && !currentTrack?.paused ? (
          <PauseIcon />
        ) : (
          <PlayIcon />
        )}
      </div>
  )
}

export default MediaPlayButton
