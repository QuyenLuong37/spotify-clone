import { HeartIcon, PauseIcon } from '@heroicons/react/outline'
import { AdjustmentsIcon, FastForwardIcon, PlayIcon, RefreshIcon, RewindIcon, VolumeOffIcon, VolumeUpIcon } from '@heroicons/react/solid'
import { Slider } from 'antd'
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import useSpotify from '../hook/useSpotify'
import { currentTrackIsPlayingState } from '../recoil/currentTrackAtom'
import { millisToMinutesAndSeconds } from '../untils/duration-to-time'

type RepeatState = 'off' | 'context' | 'track';

function WebPlayback({ accessToken }) {
  const [is_paused, setPaused] = useState(false)
  const [is_shuffle, setShuffle] = useState(false)
  const [is_active, setActive] = useState(false)
  const [repeat_mode, setRepeatMode] = useState(0)
  const volumeLocal = localStorage.getItem('volume');
  const [volume, setVolume] = useState(volumeLocal ? +volumeLocal : 0.5)
  const [player, setPlayer]: any = useState(null)
  const [position, setPosition] = useState(0);
  // const [current_track, setTrack] = useState(track)
  const [current_track, setCurrentTrackIsPlaying]: any = useRecoilState(currentTrackIsPlayingState)
  
  const spotifyApi = useSpotify()
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true

    document.body.appendChild(script)
    ;(window as any).onSpotifyWebPlaybackSDKReady = async () => {
      const player = new (window as any).Spotify.Player({
        name: 'May cua Quyen',
        getOAuthToken: (cb) => {
          cb(accessToken)
        },
        // volume: 0.5,
      })
      setPlayer(player)

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
        spotifyApi.transferMyPlayback([device_id]).then(
          (res) => {
            console.log('transferMyPlayback: ', res)
          },
          (err) => {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err)
          }
        )
      })

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })

      player.addListener('player_state_changed', (state) => {
        if (!state) {
          return
        }
        // console.log('current_track: ', state)
        const volume = localStorage.getItem('volume');
        player.setVolume(volume ? +volume : .5).then(volume => {
        })
        setCurrentTrackIsPlaying({...state.track_window.current_track, paused: state.paused, duration: state.duration});
        setPaused(state.paused)
        setShuffle(state.shuffle);
        setRepeatMode(state.repeat_mode);
        // player.seek(Math.floor(state.position / 1000))
        setPosition(state.position)

        player.getCurrentState().then((a) => {
          !state ? setActive(false) : setActive(true)
        })
      })


      player.connect().then((success) => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!')
        }
      })
    }
  }, [])

  // useEffect(() => {
  //   console.log('user effect position: ', position);
  //   if (position && position <= current_track?.duration) {
  //     player.seek(position)
  //     console.log('new position: ', (Math.floor(position / 1000) + 1) * 1000);
  //     // setPosition((Math.floor(position / 1000) + 1) * 1000)
  //   }
  // })
  
  let repeatIcon, volumeTmp;
  if (volume) {
    volumeTmp = <div className="flex items-center justify-end">
      <VolumeUpIcon className="h-5 mr-3 cursor-pointer" onClick={() => toggleVolume('off')} />
      <Slider tooltipVisible={false} step={0.01}  value={volume} min={0} max={1} onChange={(e) => adjustVolume(e)} className="flex-grow w-36" />
    </div>
  } else {
    volumeTmp = <div className="flex items-center justify-end">
      <VolumeOffIcon className="h-5 mr-3 cursor-pointer" onClick={() => toggleVolume('on')} />
      <Slider tooltipVisible={false} step={0.01} value={volume} min={0} max={1} onChange={(e) => adjustVolume(e)} className="flex-grow w-36" />
    </div>
  }

  if (repeat_mode === 2) {
    repeatIcon = <div className="relative">
      <RefreshIcon onClick={() => changeRepeatMode('off')} className="h-5 text-green-500 cursor-pointer" /> <span className="absolute -top-1 -right-1 text-[10px] text-green-500">1</span>
    </div>
  } else if (repeat_mode === 1) {
    repeatIcon = <RefreshIcon onClick={() => changeRepeatMode('track')} className="h-5 text-green-500 cursor-pointer" />
  } else {
    repeatIcon = <RefreshIcon onClick={() => changeRepeatMode('context')} className="h-5 cursor-pointer" />
  }

  // useEffect(() => {
  //   setInterval(() => {
  //     setPosition(position + 1);
  //   }, 1000);

  //   if (position >= current_track?.duration) {
  //     clearInterval();
  //   }
  // }, [position])


  const changeRepeatMode = (type: RepeatState) => {
    spotifyApi.setRepeat(type).then(res => {
      console.log('changeRepeatMode: ', res);
    })
  }
  const shuffle = () => {
    spotifyApi.setShuffle(!is_shuffle).then(res => {
      console.log('setShuffle: ', res);
    })
  }

  const adjustVolume = (e) => {
    console.log('set : ', e);
    setVolume(e);
    localStorage.setItem('volume', e);
    player.setVolume(e);
  }

  const toggleVolume = (type: 'on' | 'off') => {
    if (type === 'on') {
      player.getVolume().then(volume => {
        setVolume(.4);
        player.setVolume(.4);
        localStorage.setItem('volume', '0.4');
      })
    } else {
      player.setVolume(0).then(res => {
        setVolume(0);
        localStorage.setItem('volume', "0");
      })
    }
  }

  const setPositionPlayMusic = (position: number) => {
    const duration = Math.floor(current_track.duration / 1000);
    if (position <= duration) {
      setPosition(position * 1000)
      player.seek((position) * 1000);
    }
  }

  return (
    <div className="fixed bottom-0 right-0 left-0 text-gray-300 bg-gray-800">
          <div className="px-4 py-6">
            <div className="grid grid-cols-3 items-center">
              <div className="">
                <div className="flex items-center space-x-4">
                  <img
                      src={current_track?.album?.images?.[0]?.url}
                      className="now-playing__cover h-16 w-16"
                      alt=""
                    />

                  <div className="">
                    <div>{current_track?.name}</div>
                    <div className="text-gray-500 text-sm">
                      {current_track?.artists?.[0]?.name}
                    </div>
                  </div>
                  <HeartIcon className="h-6" />
                </div>
              </div>

              <div className="">
                <div className="flex items-center justify-center space-x-8">
                    <svg onClick={() => shuffle()} className={is_shuffle ? 'h-4 cursor-pointer fill-green-500' : 'h-4 fill-white cursor-pointer'} xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" >
                      <g>
                        <path d="M168.7,328.5L112.6,384c-14.8,14.9-40.7,25.6-61.4,25.6H0v-51.2h51.2c7.4,0,20.5-5.1,25.6-10.5l55.6-55.8L168.7,328.5z    M409.6,102.4V25.6L512,128L409.6,230.4v-76.8h-51.2c-7.4,0-20.5,5.1-25.6,10.5l-55.5,55.8l-36.6-36.3L297,128   c14.9-14.8,40.7-25.6,61.7-25.6h51.2H409.6z M409.6,358.4v-76.8L512,384L409.6,486.4v-76.8h-51.2c-21,0-46.9-10.8-61.7-25.6   L76.6,164.1c-4.9-5.1-17.7-10.5-25.4-10.5H0v-51.2h51.2c21,0,46.9,10.8,61.7,25.6L333,347.9c5.1,5.1,17.9,10.5,25.4,10.5H409.6z"/>
                      </g>
                      </svg>

                  <RewindIcon onClick={() => player.previousTrack()} className="cursor-pointer h-6" />
                  {/* <PauseIcon className="cursor-pointer h-6" /> */}
                  {is_paused && (
                    <PlayIcon onClick={() => player.togglePlay()} className="cursor-pointer h-6" />
                  )}
                  {!is_paused && (
                    <PauseIcon onClick={() => player.togglePlay()} className="cursor-pointer h-6" />
                  )}
                  <FastForwardIcon onClick={() => player.nextTrack()}  className="cursor-pointer h-6" />
                  {repeatIcon}
                  {/* <AdjustmentsIcon className="cursor-pointer h-5" /> */}
                </div>

                <div className="flex items-center space-x-2 mt-2">
                  <div>{millisToMinutesAndSeconds(position)}</div>
                  <Slider value={Math.floor(position / 1000)} tooltipVisible={true} min={0} max={Math.floor(current_track?.duration / 1000) } className="flex-grow" defaultValue={30} onChange={(e) => setPositionPlayMusic(e)} />
                  <div className="justify-self-end">{millisToMinutesAndSeconds(current_track?.duration)}</div>
                </div>
              </div>

              <div className="justify-self-end">
                {volumeTmp}
              </div>
            </div>

          </div>
    </div>
  )
}

export default WebPlayback
