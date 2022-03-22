import { HeartIcon } from '@heroicons/react/solid';
import { MusicNoteIcon, PauseIcon, PlayIcon, DotsHorizontalIcon } from '@heroicons/react/solid';
import { Dropdown, Menu, message, Tooltip } from 'antd';
import { format } from 'date-fns';
import Link from 'next/link';
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil';
import useSpotify from '../hook/useSpotify';
import { currentTrackIsPlayingState } from '../recoil/currentTrackAtom';
import { millisToMinutesAndSeconds } from '../utils/duration-to-time';
const { SubMenu } = Menu;

function MediaTableRow({track, uri, index, colsVisible, hasOffset = true}) {
    const spotifyApi = useSpotify();
    const currentTrack: any = useRecoilValue(currentTrackIsPlayingState);
    const [newTrack, setNewTrack] = useState(track);
    const pausePlayback = () => {
        spotifyApi.pause();
    }
    
    const playTrackInPlaylist = (e) => {
        e.stopPropagation();
        spotifyApi.play({context_uri: uri, offset: {position: hasOffset ? index : 0}, position_ms: currentTrack?.track_window?.current_track?.id === track?.id ? currentTrack?.position : 0});
    }

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <div>Add to queue</div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1">
                <div>Go to song radio</div>
            </Menu.Item>
            <Menu.Item key="2">
                <div>Go to artist</div>
            </Menu.Item>
            <Menu.Item key="3">
                <div>Go to album</div>
            </Menu.Item>
            <Menu.Item key="4">
                <div>Show credits</div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="5">
                <div>Remove from your Liked Songs</div>
            </Menu.Item>
            <SubMenu title="Add to playlists">
                <Menu.Item>Play list 1</Menu.Item>
                <Menu.Item>Play list 2</Menu.Item>
            </SubMenu>
            <Menu.Divider />
            <SubMenu title="Share">
                <Menu.Item>Copy Song Link</Menu.Item>
                <Menu.Item>Embed track</Menu.Item>
            </SubMenu>
            <Menu.Divider />
            <Menu.Item key="8">Open in Desktop app</Menu.Item>
        </Menu>
    )

    const saveTrack = (e) => {
        e.stopPropagation();
        if (newTrack?.isSaved) {
            spotifyApi.removeFromMySavedTracks([newTrack?.id]).then(res => {
                
                setNewTrack({...track, isSaved: false})
                track = {...track, isSaved: false}
                message.success('Removed from your Liked Songs ')
            })
        } else {
            spotifyApi.addToMySavedTracks([newTrack?.id]).then(res => {
                
                setNewTrack({...track, isSaved: true});
                message.success('Added to your Liked Songs ')
            })
        }
    }

    return (
        <div>
            <div>
                <div  className="media-table-cols-5 group">
                    <div className={colsVisible.includes('ordinal') ? 'visible' : 'invisible'}>
                        <div  className="flex justify-center">
                            {((newTrack?.id === currentTrack?.track_window?.current_track?.id  || newTrack?.id === currentTrack?.track_window?.current_track?.linked_from?.id) && currentTrack?.paused === false) && (
                            <>
                                {/* <MusicNoteIcon className={((track?.id === currentTrack?.track_window?.current_track?.id  || track?.id === currentTrack?.track_window?.current_track?.linked_from?.id) && trackSelected !== track?.id) ? 'h-6 text-green-500 group-hover:hidden' : 'hidden'} /> */}

                                <img width='16' height='16' className={((newTrack?.id === currentTrack?.track_window?.current_track?.id  || newTrack?.id === currentTrack?.track_window?.current_track?.linked_from?.id)) ? 'text-green-500 group-hover:hidden' : 'hidden'} src="/equaliser-animated-green.gif"  />

                                <PauseIcon onClick={() => pausePlayback()} className='hidden group-hover:block h-7' />
                            </>
                            )}
                            {((newTrack?.id !== currentTrack?.track_window?.current_track?.id && newTrack?.id !== currentTrack?.track_window?.current_track?.linked_from?.id) || currentTrack?.paused === true) && (
                            <>
                            <PlayIcon onClick={(e) => {playTrackInPlaylist(e)}} className='h-7 hidden group-hover:inline-block'/>
                            <span className={((newTrack?.id === currentTrack?.track_window?.current_track?.id  || newTrack?.id === currentTrack?.track_window?.current_track?.linked_from?.id) ) ? 'group-hover:hidden text-green-500' : 'group-hover:hidden'}>{index + 1}</span></>
                            )}
                        </div>
                    </div>
                    <div className={colsVisible.includes('title') ? 'visible' : 'invisible'}>
                        <div className="flex items-center space-x-3">
                        {newTrack?.trackImg && <img src={newTrack?.trackImg} className="w-10 h-10 rounded" alt="" />}
                        <div>
                            <div className={(newTrack?.id === currentTrack?.track_window?.current_track?.id  || newTrack?.id === currentTrack?.track_window?.current_track?.linked_from?.id) ? 'text-green-500 font-semibold text-sm line-clamp-1' : 'text-white font-semibold text-sm line-clamp-1'}>{newTrack?.name}</div>
                            <div className='text-sm flex space-x-1 text-gray-400'>
                                {newTrack?.artists?.length > 0 && (
                                    newTrack?.artists?.map((item, index) => {
                                        return <Link href={`/artist/${item.id}`} key={index}>
                                            <Tooltip title={item.name} placement='bottomLeft'>
                                                <div className='flex space-x-2'><span className='transition duration-200 hover:underline hover:text-gray-300 line-clamp-1'>{item.name}</span>{newTrack.artists.length - 1 !== index ? ', ' : ''}</div>
                                            </Tooltip>
                                        </Link>
                                    })
                                )}
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className={colsVisible.includes('album') ? 'visible' : 'invisible'}>
                        <div className='text-sm '>{newTrack?.album?.name}</div>
                    </div>
                    <div className={colsVisible.includes('added_at') ? 'visible' : 'invisible'}>
                        <div className='text-sm'>{newTrack?.added_at ? format(new Date(newTrack?.added_at), 'MMM dd, yyyy') : ''}</div>
                    </div>
                    {/* {track?.album?.name && <div className='text-sm '>{track?.album?.name}</div>}
                    {track?.added_at && <div className='text-sm'>{format(new Date(track?.added_at), 'MMM dd, yyyy')}</div>} */}
                    <div className={colsVisible.includes('duration') ? 'visible' : 'invisible'}>
                        <div className='text-sm flex justify-center'>
                            <div className="grid grid-cols-3 gap-4 items-center">
                                <HeartIcon onClick={(e) => saveTrack(e)} className={newTrack?.isSaved ? 'h-5 cursor-pointer fill-green-500 stroke-green-500' : 'invisible group-hover:visible h-5 cursor-pointer fill-transparent stroke-white'} />
                                <div>{millisToMinutesAndSeconds(newTrack?.duration_ms)}</div>

                                <Dropdown  overlay={menu} 
                                    trigger={['click']}
                                >
                                    <DotsHorizontalIcon  className='invisible group-hover:visible h-5 cursor-pointer' />
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MediaTableRow