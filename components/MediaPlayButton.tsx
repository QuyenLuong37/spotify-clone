import React from 'react'
import useSpotify from '../hook/useSpotify'
import Icon from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import { currentTrackIsPlayingState } from '../recoil/currentTrackAtom'
import PauseIcon from '../icons/PauseIcon'
import PlayIcon from '../icons/PlayIcon'

function MediaPlayButton({ uri }) {
  const spotifyApi = useSpotify()
  const currentTrack: any = useRecoilValue(currentTrackIsPlayingState)
  const play = (e) => {
    e.stopPropagation();
    spotifyApi.play({ context_uri: uri, position_ms:  currentTrack?.context?.uri === uri ? currentTrack?.position : 0});
  }
  const pause = (e) => {
    e.stopPropagation();
    spotifyApi.pause();
  }
  if (!currentTrack) {
    return <></>
  }
  return (
      <div onClick={(e) => currentTrack?.context?.uri === uri && !currentTrack?.paused ? pause(e) : play(e)} className="flex h-10 w-10 2xl:h-12 2xl:w-12 transform cursor-pointer items-center justify-center rounded-full bg-green-400 p-[10px] text-white transition duration-150 hover:scale-110 shadow-lg">
        {!currentTrack?.paused ? (
          <PauseIcon />
        ) : (
          <PlayIcon />
        )}
      </div>
  )
}

export default MediaPlayButton
