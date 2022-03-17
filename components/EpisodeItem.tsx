import Image from 'next/image'
import React from 'react'
import {DeleteOutlined} from '@ant-design/icons';
import { format } from 'date-fns';
import { millisToMinutesAndSeconds } from '../utils/duration-to-time';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { removeSavedEpisodeApi } from '../lib/spotify';
import { message } from 'antd';
import { useRecoilState } from 'recoil';
import { savedEpisodeState } from '../recoil/episodeAtom';

function EpisodeItem({id, name, showName, description, duration_ms, release_date, uri, image}) {
    const { data: session }: any = useSession();
    const [savedEpisode, setSavedEpisode]: any = useRecoilState(savedEpisodeState);
    
    const removeSavedEpisode = async () => {
        const res = await removeSavedEpisodeApi(id, session.accessToken);
        setSavedEpisode({
            ...savedEpisode,
            items: savedEpisode?.items?.filter(item => item?.id !== id)
        })
        message.success('Removed from Your Episode');
    }
  return (
    <div className=' px-3 transition duration-200 rounded hover:bg-[#262626] md:max-w-3xl lg:max-w-4xl'>
        <div className='grid grid-cols-[auto_1fr] gap-4 py-4 cursor-pointer  border-b border-gray-700'>
            <div className="relative h-[110px] w-[110px] lg:h-[120px] lg:w-[120px]">
                <Image className=' rounded' src={image} layout="fill" />
            </div>

            <div className="flex flex-col justify-between space-y-3">
                <div className="font-bold text-lg">
                    <Link href='/episode/a'><span className='transition duration-200 hover:underline'>{name}</span></Link> - <Link href='/show/a'><span className='transition duration-200 hover:underline'>{showName}</span></Link>
                </div>
                <div className="text-gray-400 line-clamp-2 text-xs">{description}</div>
                <div className="flex justify-between items-center font-medium text-gray-300 text-xs">
                    <div className='flex space-x-3 items-center'>
                        <div className="flex justify-center items-center h-[30px] w-[30px] rounded-full bg-gray-200 p-2 transition duration-200 transform hover:scale-105">
                            <svg role="img" fill='#222' height="14" width="14" viewBox="0 0 16 16"><path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path>
                            </svg>
                        </div>

                        <div>{format(new Date(release_date), 'MMM yyyy')} - {millisToMinutesAndSeconds(duration_ms)} sec</div>
                    </div>
                    {/* <svg role="img" height="24" width="24" viewBox="0 0 24 24" class="Svg-sc-1bi12j5-0 hDgDGI"><path d="M3 8a1 1 0 011-1h3.5v2H5v11h14V9h-2.5V7H20a1 1 0 011 1v13a1 1 0 01-1 1H4a1 1 0 01-1-1V8z"></path><path d="M12 12.326a1 1 0 001-1V3.841l1.793 1.793a1 1 0 101.414-1.414L12 .012 7.793 4.22a1 1 0 101.414 1.414L11 3.84v7.485a1 1 0 001 1z"></path></svg> */}
                    <DeleteOutlined onClick={() => removeSavedEpisode()} className='text-base flex items-center cursor-pointer transition duration-200 transform hover:scale-110 hover:text-white' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default EpisodeItem