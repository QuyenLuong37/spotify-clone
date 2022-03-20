import Image from 'next/image'
import React from 'react'
import {DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons';
import { format } from 'date-fns';
import { millisToMinutesAndSeconds } from '../utils/duration-to-time';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { removeSavedEpisodeApi } from '../lib/spotify';
import { message, Popconfirm } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { savedEpisodeState } from '../recoil/episodeAtom';
import MediaPlayButton from './MediaPlayButton';
import useSpotify from '../hook/useSpotify';
import { currentTrackIsPlayingState } from '../recoil/currentTrackAtom';
import PlayIcon from '../icons/PlayIcon';
import PauseIcon from '../icons/PauseIcon';

function EpisodeItem({id, name, showName, description, duration_ms, release_date, uri, image, position}) {
    const { data: session }: any = useSession();
    const [savedEpisode, setSavedEpisode]: any = useRecoilState(savedEpisodeState);
    const spotifyApi = useSpotify();
    const currentTrack: any = useRecoilValue(currentTrackIsPlayingState);
    
    const removeSavedEpisode = async () => {
        const res = await removeSavedEpisodeApi(id, session.accessToken);
        setSavedEpisode({
            ...savedEpisode,
            items: savedEpisode?.items?.filter(item => item?.id !== id)
        })
        message.success('Removed from Your Episode');
    }
    
    const play = () => {
        spotifyApi.play({context_uri: uri, offset: {position}, position_ms: currentTrack?.track_window?.current_track?.id === id ? currentTrack?.position : 0});
    }

    const pause = () => {
        spotifyApi.pause();
    }
  return (
    <div className=' px-3 transition duration-200 rounded hover:bg-[#262626] md:max-w-3xl lg:max-w-4xl'>
        <div className='grid grid-cols-[auto_1fr] gap-4 py-6 cursor-pointer  border-b border-gray-700'>
            <div className="relative h-[110px] w-[110px] lg:h-[120px] lg:w-[120px]">
                <Image className=' rounded' src={image} layout="fill" />
            </div>

            <div className="flex flex-col justify-between space-y-3">
                <div className='space-y-1'>
                    <div className="font-bold text-lg">
                        <Link href={`/episode/${id}`}><span className='transition duration-200 hover:underline'>{name}</span></Link> - <Link href='/show/a'><span className='transition duration-200 hover:underline'>{showName}</span></Link>
                    </div>
                    <div className="text-gray-400 line-clamp-2 text-xs">{description}</div>
                </div>
                <div className="flex justify-between items-center font-medium text-gray-300 text-xs">
                    <div className='flex space-x-3 items-center'>
                        <div className="flex justify-center items-center h-9 w-9 rounded-full bg-green-500 p-2 transition duration-200 transform hover:scale-105" onClick={() => currentTrack?.track_window?.current_track?.id === id && !currentTrack?.paused ? pause() : play()}>
                            {currentTrack?.track_window?.current_track?.id === id && !currentTrack?.paused ? (<PauseIcon />) : (<PlayIcon />)}
                        </div>
                        <div>{format(new Date(release_date), 'MMM yyyy')} - {millisToMinutesAndSeconds(duration_ms)} sec</div>
                    </div>
                    {/* <PlusCircleOutlined className='text-xl flex items-center cursor-pointer transition duration-200 transform hover:text-white' /> */}
                    {/* <Popconfirm
                        title="Are you sure to delete this episode from your library?"
                        onConfirm={removeSavedEpisode}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined className='text-base flex items-center cursor-pointer transition duration-200 transform hover:scale-110 hover:text-white' />
                    </Popconfirm> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default EpisodeItem