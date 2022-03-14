import { MusicNoteIcon, PauseIcon, PlayIcon, HeartIcon, DotsHorizontalIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil';
import useSpotify from '../hook/useSpotify';
import { currentTrackIsPlayingState } from '../recoil/currentTrackAtom';
import { millisToMinutesAndSeconds } from '../untils/duration-to-time';

function MediaTableRow({track, uri, index, colsVisible}) {
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
        spotifyApi.play({context_uri: uri, offset: {position: index}, position_ms: 0}).then(res => {
        console.log('res: ', res);
        })
    }
  return (
    <div onClick={() => setTrackSelected(track?.id)} className={trackSelected === track?.id ? 'bg-gray-800 text-white' : 'bg-transparent'}>
        <div  className="media-table-cols-5 group">
            <div className="flex justify-center">
                {((track?.id === currentTrackIsPlaying?.id  || track?.id === currentTrackIsPlaying?.linked_from?.id) && currentTrackIsPlaying?.paused === false) && (
                <>
                    <MusicNoteIcon className={((track?.id === currentTrackIsPlaying?.id  || track?.id === currentTrackIsPlaying?.linked_from?.id) && trackSelected !== track?.id) ? 'h-6 text-green-500 group-hover:hidden' : 'hidden'} />

                    <PauseIcon onClick={() => pausePlayback()} className={trackSelected === track?.id ? 'group-hover:block h-7' : 'hidden group-hover:block h-7'} />
                </>
                )}
                {((track?.id !== currentTrackIsPlaying?.id && track?.id !== currentTrackIsPlaying?.linked_from?.id) || currentTrackIsPlaying?.paused === true) && (
                <>
                <PlayIcon onClick={(e) => {playTrackInPlaylist(e, track, index)}} className={trackSelected === track?.id ? 'h-7' : 'h-7 hidden group-hover:inline-block'}/>
                <span className={trackSelected === track?.id ? 'hidden' : ((track?.id === currentTrackIsPlaying?.id  || track?.id === currentTrackIsPlaying?.linked_from?.id) ) ? 'group-hover:hidden text-green-500' : 'group-hover:hidden'}>{index + 1}</span></>
                )}
            </div>
            <div className={colsVisible.includes('title') ? 'visible' : 'invisible'}>
                <div className="flex items-center space-x-3">
                {track?.album?.images[0]?.url && <img src={track?.album?.images[0]?.url} className="w-10 h-10" alt="" />}
                <div>
                    <div className={(track?.id === currentTrackIsPlaying?.id  || track?.id === currentTrackIsPlaying?.linked_from?.id) ? 'text-green-500 font-semibold text-sm' : 'text-white font-semibold text-sm'}>{track?.name}</div>
                    <div className='text-sm'>{track?.artists?.[0].name}</div>
                </div>
                </div>
            </div>
            <div className={colsVisible.includes('album') ? 'visible' : 'invisible'}>
                <div className='text-sm '>{track?.album?.name}</div>
            </div>
            <div className={colsVisible.includes('added_at') ? 'visible' : 'invisible'}>
                <div className='text-sm'>{track?.added_at ? format(new Date(track?.added_at), 'MMM dd, yyyy') : ''}</div>
            </div>
            {/* {track?.album?.name && <div className='text-sm '>{track?.album?.name}</div>}
            {track?.added_at && <div className='text-sm'>{format(new Date(track?.added_at), 'MMM dd, yyyy')}</div>} */}
            <div className={colsVisible.includes('duration') ? 'visible' : 'invisible'}>
                <div className='text-sm flex justify-center'>
                    <div className="flex items-center">
                        <HeartIcon  className={trackSelected === track?.id ? 'h-5 cursor-pointer mr-4' : 'hidden group-hover:block h-5 cursor-pointer mr-4'} />
                        <div>{millisToMinutesAndSeconds(track?.duration_ms)}</div>
                        <DotsHorizontalIcon  className={trackSelected === track?.id ? 'h-5 cursor-pointer ml-4' : 'hidden group-hover:block h-5 cursor-pointer ml-4'} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MediaTableRow