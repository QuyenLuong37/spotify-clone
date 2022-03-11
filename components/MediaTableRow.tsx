import { MusicNoteIcon, PauseIcon, PlayIcon, HeartIcon, DotsHorizontalIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil';
import useSpotify from '../hook/useSpotify';
import { currentTrackIsPlayingState } from '../recoil/currentTrackAtom';
import { millisToMinutesAndSeconds } from '../untils/duration-to-time';

function MediaTableRow({row, playlistUri, index}) {
    const [trackSelected, setTrackSelected]: any = useState(null)
    const spotifyApi = useSpotify();
    const currentTrackIsPlaying: any = useRecoilValue(currentTrackIsPlayingState);
    const pausePlayback = () => {
        spotifyApi.pause().then(res => {
            console.log('pause res: ', res);
        })
    }

    
    const playTrackInPlaylist = (e, track, index) => {
        e.stopPropagation();
        spotifyApi.play({context_uri: playlistUri, offset: {position: index}, position_ms: 0}).then(res => {
        console.log('res: ', res);
        })
    }
  return (
    <div onClick={() => setTrackSelected(row?.track?.id)} className={trackSelected === row?.track?.id ? 'bg-gray-800 text-white' : 'bg-transparent'}>
        <div  className="grid grid-cols-[[index]_40px_[first]_6fr_[var1]_4fr_[var2]_3fr_[last]_minmax(120px,1fr)] gap-4 items-center h-14 cursor-pointer transition duration-300 hover:bg-gray-800 hover:text-white group rounded px-4 border border-transparent"  >
        <div className="flex justify-center">
            {((row?.track?.id === currentTrackIsPlaying?.id  || row?.track?.id === currentTrackIsPlaying?.linked_from?.id) && currentTrackIsPlaying?.paused === false) && (
            <>
                <MusicNoteIcon className={((row?.track?.id === currentTrackIsPlaying?.id  || row?.track?.id === currentTrackIsPlaying?.linked_from?.id) && trackSelected !== row?.track?.id) ? 'h-6 text-green-500 group-hover:hidden' : 'hidden'} />

                <PauseIcon onClick={() => pausePlayback()} className={trackSelected === row?.track?.id ? 'group-hover:block h-7' : 'hidden group-hover:block h-7'} />
            </>
            )}
            {((row?.track?.id !== currentTrackIsPlaying?.id && row?.track?.id !== currentTrackIsPlaying?.linked_from?.id) || currentTrackIsPlaying?.paused === true) && (
            <>
            <PlayIcon onClick={(e) => {playTrackInPlaylist(e, row?.track, index)}} className={trackSelected === row?.track?.id ? 'h-7' : 'h-7 hidden group-hover:inline-block'}/>
            <span className={trackSelected === row?.track?.id ? 'hidden' : ((row?.track?.id === currentTrackIsPlaying?.id  || row?.track?.id === currentTrackIsPlaying?.linked_from?.id) ) ? 'group-hover:hidden text-green-500' : 'group-hover:hidden'}>{index + 1}</span></>
            )}
        </div>
        <div>
            <div className="flex items-center space-x-3">
            <img src={row?.track?.album?.images[0]?.url} className="w-10 h-10" alt="" />
            <div>
                <div className={(row?.track?.id === currentTrackIsPlaying?.id  || row?.track?.id === currentTrackIsPlaying?.linked_from?.id) ? 'text-green-500 font-semibold text-sm' : 'text-white font-semibold text-sm'}>{row?.track?.name}</div>
                <div className='text-sm'>{row?.track?.artists?.[0].name}</div>
            </div>
            </div>
        </div>
        <div className='text-sm'>{row?.track?.album?.name}</div>
        <div className='text-sm'>{format(new Date(row?.added_at), 'MMM dd, yyyy')}</div>
        <div className='text-sm flex justify-center'>
            <div className="flex items-center">
            <HeartIcon  className={trackSelected === row?.track?.id ? 'h-5 cursor-pointer mr-4' : 'hidden group-hover:block h-5 cursor-pointer mr-4'} />
            <div>{millisToMinutesAndSeconds(row?.track?.duration_ms)}</div>
            <DotsHorizontalIcon  className={trackSelected === row?.track?.id ? 'h-5 cursor-pointer ml-4' : 'hidden group-hover:block h-5 cursor-pointer ml-4'} />
            </div>
        </div>
        </div>
    </div>
  )
}

export default MediaTableRow