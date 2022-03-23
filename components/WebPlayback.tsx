import { HeartIcon, PauseIcon } from '@heroicons/react/outline'
import { AdjustmentsIcon, FastForwardIcon, PlayIcon, RefreshIcon, RewindIcon, VolumeOffIcon, VolumeUpIcon } from '@heroicons/react/solid'
import { message, Slider } from 'antd'
import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import useSpotify from '../hook/useSpotify'
import { currentTrackIsPlayingState } from '../recoil/currentTrackAtom'
import { playerState } from '../recoil/playerAtom'
import { millisToMinutesAndSeconds } from '../utils/duration-to-time'
import Icon, {StepBackwardOutlined, StepForwardOutlined, PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import { useSession } from 'next-auth/react'

type RepeatState = 'off' | 'context' | 'track';
const RepeatSvg = () => (
  <svg role="img" height="16" width="16" viewBox="0 0 16 16"  ><path d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z"></path></svg>
);
const DisableRepeatSvg = () => (
  <svg role="img" height="16" width="16" viewBox="0 0 16 16" ><path d="M0 4.75A3.75 3.75 0 013.75 1h.75v1.5h-.75A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5zM12.25 2.5h-.75V1h.75A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25z"></path><path d="M9.12 8V1H7.787c-.128.72-.76 1.293-1.787 1.313V3.36h1.57V8h1.55z"></path></svg>
);

const SkipForwardSvg = () => (
  <svg role="img" height="16" width="16" viewBox="0 0 16 16" ><path d="M13.536 4.5h-1.473a.75.75 0 100 1.5H16V2.063a.75.75 0 00-1.5 0v1.27A8.25 8.25 0 103.962 15.887a.75.75 0 10.827-1.25A6.75 6.75 0 1113.535 4.5z"></path><path d="M6.303 8.407c.79 0 1.214-.52 1.214-.907h1.5v8h-1.5V9.907H6v-1.5h.303zm4.832-.911h4.05v1.5H12.33l-.245 1.067c.256-.071.525-.11.804-.11 1.621 0 2.954 1.3 2.954 2.924 0 1.624-1.333 2.923-2.954 2.923a2.945 2.945 0 01-2.93-2.54l1.487-.197c.092.69.696 1.237 1.443 1.237.813 0 1.454-.647 1.454-1.423s-.64-1.423-1.454-1.423c-.49 0-.92.235-1.183.594l-.01.014-.206.254-1.314-.639.96-4.181z"></path></svg>
)

const SkipBackSvg = () => (
  <svg role="img" height="16" width="16" viewBox="0 0 16 16"><path d="M2.464 4.5h1.473a.75.75 0 110 1.5H0V2.063a.75.75 0 011.5 0v1.27a8.25 8.25 0 1110.539 12.554.75.75 0 01-.828-1.25A6.75 6.75 0 102.464 4.5z"></path><path d="M.303 8.407c.79 0 1.214-.52 1.214-.907h1.5v8h-1.5V9.907H0v-1.5h.303zm4.832-.911h4.05v1.5H6.33l-.245 1.067c.256-.071.525-.11.804-.11 1.621 0 2.954 1.3 2.954 2.924C9.843 14.5 8.51 15.8 6.89 15.8a2.945 2.945 0 01-2.93-2.54l1.487-.197c.092.69.696 1.237 1.443 1.237.813 0 1.454-.647 1.454-1.423s-.64-1.423-1.454-1.423c-.49 0-.92.235-1.183.594l-.01.014-.206.254-1.314-.639.96-4.181z"></path></svg>
)

const ShuffleSvg = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" >
    <g>
      <path d="M168.7,328.5L112.6,384c-14.8,14.9-40.7,25.6-61.4,25.6H0v-51.2h51.2c7.4,0,20.5-5.1,25.6-10.5l55.6-55.8L168.7,328.5z    M409.6,102.4V25.6L512,128L409.6,230.4v-76.8h-51.2c-7.4,0-20.5,5.1-25.6,10.5l-55.5,55.8l-36.6-36.3L297,128   c14.9-14.8,40.7-25.6,61.7-25.6h51.2H409.6z M409.6,358.4v-76.8L512,384L409.6,486.4v-76.8h-51.2c-21,0-46.9-10.8-61.7-25.6   L76.6,164.1c-4.9-5.1-17.7-10.5-25.4-10.5H0v-51.2h51.2c21,0,46.9,10.8,61.7,25.6L333,347.9c5.1,5.1,17.9,10.5,25.4,10.5H409.6z"/>
    </g>
  </svg>
)

const RepeatIcon = props => <Icon component={RepeatSvg} {...props} />;
const DisableRepeatIcon = props => <Icon component={DisableRepeatSvg} {...props} />;
const SkipForwardIcon = props => <Icon component={SkipForwardSvg} {...props} />;
const SkipBackIcon = props => <Icon component={SkipBackSvg} {...props} />;
const ShuffleIcon = props => <Icon component={ShuffleSvg} {...props} />;

function WebPlayback() {
  const [isPaused, setPaused] = useState(true)
  const [isShuffle, setShuffle] = useState(false)
  const [isActive, setActive] = useState(false)
  const [repeatMode, setRepeatMode] = useState(0)
  const [volume, setVolume] = useState(0.01)
  const [position, setPosition] = useState(0);
  const [isSavedTrack, setIsSavedTrack] = useState(false);
  const {data: session} = useSession();
  const player: any = useRecoilValue(playerState)
  const currentTrack: any = useRecoilValue(currentTrackIsPlayingState);
  
  const spotifyApi = useSpotify()
  
  useEffect(() => {
    let intervalId;
    if (currentTrack  ) {
      if (currentTrack.paused) {
        setPosition(position);
        return
      } else {
        intervalId = setInterval(() => {
          setPosition(position + 1000);
        }, 1000);
      }
    };
    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [position]);

  useEffect(() => {
    if (player) {
      if (currentTrack) {
        // console.log("🚀currentTrack", currentTrack)
        if (currentTrack?.track_window?.current_track?.id) {
          spotifyApi.containsMySavedTracks([currentTrack?.track_window?.current_track?.id]).then(res => {
            setIsSavedTrack(res.body[0])
          })
        }
        const volumeLocal = localStorage.getItem('volume');
        setVolume(volumeLocal ? +volumeLocal : 0.5)
        setPaused(currentTrack.paused)
        setShuffle(currentTrack.shuffle);
        setRepeatMode(currentTrack.repeat_mode);
        setPosition(currentTrack.position)
      }
    }
  }, [session, player, currentTrack])


  const changeRepeatMode = (type: RepeatState) => {
    spotifyApi.setRepeat(type).then(res => {
      
    })
  }
  const shuffle = () => {
    spotifyApi.setShuffle(!isShuffle).then(res => {
      
    })
  }

  const adjustVolume = (e) => {
    
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
    setPosition(position)
  }

  const onAfterChangeSlider = (e) => {
    const duration = currentTrack.duration;
    if (position <= duration) {
      player.seek(position);
    }
  }

  const skip = (ms) => {
    if (position + ms < 0) {
      player.seek(0);
    } else {
      player.seek(position + ms);
    }
  }

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

  if (repeatMode === 0) {
    repeatIcon = <RepeatIcon onClick={() => changeRepeatMode('context')} className="fill-white cursor-pointer" />
  } else if (repeatMode === 1) {
    repeatIcon = <RepeatIcon onClick={() => changeRepeatMode('track')} className="fill-green-500 cursor-pointer" />
  } else if (repeatMode === 2) {
    repeatIcon = <DisableRepeatIcon onClick={() => changeRepeatMode('off')} className=" fill-green-500 cursor-pointer" />
  }

  const toggleSaveTrack = () => {
    if (isSavedTrack) {
      spotifyApi.removeFromMySavedTracks([currentTrack?.track_window?.current_track?.id]).then(res => {
      setIsSavedTrack(false);
      message.success('Removed from your Liked Songs')

      })
    } else {
      spotifyApi.addToMySavedTracks([currentTrack?.track_window?.current_track?.id]).then(res => {
        setIsSavedTrack(true);
        message.success('Added to your Liked Songs')
      })
    }
  }

  return (
    <div className="grid grid-cols-3 gap-6 items-center text-white h-[105px] bg-[#181818] px-6">
        <div className="flex items-center space-x-4">
          <img
              src={currentTrack?.track_window?.current_track?.album?.images?.[0]?.url}
              className="now-playing__cover h-12 w-12"
              alt=""
            />

          <div className="">
            <div className='line-clamp-1'>{currentTrack?.track_window?.current_track?.name}</div>
            <div className="text-gray-500 text-xs">
              {currentTrack?.track_window?.current_track?.artists?.[0]?.name}
            </div>
          </div>
          <div>
          <HeartIcon onClick={() => toggleSaveTrack()} className={isSavedTrack ? "h-5 fill-green-500 stroke-green-500" : 'h-5'} />
          </div>
        </div>

      <div className="">
        <div className="flex items-center justify-center space-x-8">
          {currentTrack?.track_window?.current_track?.type !== 'episode' && <ShuffleIcon onClick={() => shuffle()} className={isShuffle ? 'transition duration-200 cursor-pointer text-xl flex h-4 fill-green-500' : 'transition duration-200 cursor-pointer text-xl flex h-4 fill-white'}/>}
          {currentTrack?.track_window?.current_track?.type === 'episode' && <SkipBackIcon onClick={() => skip(-15000)} className="cursor-pointer text-xl flex fill-white" />}
          <StepBackwardOutlined onClick={() => player.previousTrack()} className="cursor-pointer text-xl flex" />
          {isPaused && (
            <PlayCircleFilled onClick={() => player.togglePlay()} className="cursor-pointer text-3xl flex" />
          )}
          {!isPaused && (
            <PauseCircleFilled  onClick={() => player.togglePlay()} className="cursor-pointer text-3xl flex" />
          )}
          <StepForwardOutlined onClick={() => player.nextTrack()}  className="cursor-pointer text-xl flex" />
          {currentTrack?.track_window?.current_track?.type === 'episode' && <SkipForwardIcon onClick={() => skip(15000)} className="cursor-pointer text-xl flex fill-white" />}
          {currentTrack?.track_window?.current_track?.type !== 'episode' ? repeatIcon : null}
        </div>

        <div className="flex items-center space-x-2 mt-1">
          <div>{millisToMinutesAndSeconds(position)}</div>
          <div className='flex-grow'>
            <Slider value={Math.round(position)} tooltipVisible={false} step={1000} min={0} max={Math.round(currentTrack?.duration) } defaultValue={0} onChange={(e) => setPositionPlayMusic(e)} onAfterChange={(e) => onAfterChangeSlider(e)} />
          </div>
          <div className="justify-self-end">{currentTrack?.duration ? millisToMinutesAndSeconds(currentTrack?.duration) : ''}</div>
        </div>
      </div>

      <div className="justify-self-end">
        {volumeTmp}
      </div>
    </div>
  )
}

export default WebPlayback
