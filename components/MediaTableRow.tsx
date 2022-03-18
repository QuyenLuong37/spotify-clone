import { HeartIcon } from '@heroicons/react/outline';
import { MusicNoteIcon, PauseIcon, PlayIcon, DotsHorizontalIcon } from '@heroicons/react/solid';
import { Tooltip } from 'antd';
import { format } from 'date-fns';
import Link from 'next/link';
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil';
import useSpotify from '../hook/useSpotify';
import { currentTrackIsPlayingState } from '../recoil/currentTrackAtom';
import { millisToMinutesAndSeconds } from '../utils/duration-to-time';

function MediaTableRow({track, uri, index, colsVisible}) {
    const [trackSelected, setTrackSelected]: any = useState(null)
    const spotifyApi = useSpotify();
    const currentTrackIsPlaying: any = useRecoilValue(currentTrackIsPlayingState);
    const pausePlayback = () => {
        spotifyApi.pause().then(res => {
            
        })
    }

    
    const playTrackInPlaylist = (e, track, index) => {
        e.stopPropagation();
        if (track.type === 'track') {
            console.log('uri: ', track.uri);
            spotifyApi.play({context_uri: track.uri, position_ms: 0});
        } else {
            spotifyApi.play({context_uri: uri, offset: {position: index}, position_ms: 0});
        }
    }
  return (
    <div className=''>
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
                    {track?.trackImg && <img src={track?.trackImg} className="w-10 h-10 rounded" alt="" />}
                    <div>
                        <div className={(track?.id === currentTrackIsPlaying?.id  || track?.id === currentTrackIsPlaying?.linked_from?.id) ? 'text-green-500 font-semibold text-sm line-clamp-1' : 'text-white font-semibold text-sm line-clamp-1'}>{track?.name}</div>
                        <div className='text-sm flex space-x-1 text-gray-400'>
                            {track?.artists?.length > 0 && (
                                track?.artists?.map((item, index) => {
                                    return <Link href={`/artist/${item.id}`} key={index}>
                                        <Tooltip title={item.name}>
                                            <div className='flex space-x-2'><span className='transition duration-200 hover:underline hover:text-gray-300 line-clamp-1'>{item.name}</span>{track.artists.length - 1 !== index ? ', ' : ''}</div>
                                        </Tooltip>
                                    </Link>
                                })
                            )}
                        </div>
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
    </div>
  )
}

export default MediaTableRow