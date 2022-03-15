import Image from 'next/image'
import React from 'react'
import {DeleteOutlined} from '@ant-design/icons';
import { format } from 'date-fns';
import { millisToMinutesAndSeconds } from '../utils/duration-to-time';
import Link from 'next/link';

function EpisodeItem({name, showName, description, duration_ms, release_date, uri, image}) {
  return (
    <div className='grid grid-cols-[auto_1fr] gap-4 py-4 px-3 cursor-pointer transition duration-200 hover:bg-black border-b border-gray-600 max-w-3xl'>
        <div className="relative h-[90px] w-[90px]">
            <Image src={image} layout="fill" />
        </div>

        <div className="flex flex-col justify-between space-y-2">
            <div className="font-bold">
                <Link href='/episode/a'><span className='transition duration-200 hover:underline'>{name}</span></Link> - <Link href='/show/a'><span className='transition duration-200 hover:underline'>{showName}</span></Link>
            </div>
            <div className="text-gray-400 line-clamp-2 text-xs">{description}</div>
            <div className="flex justify-between items-center text-gray-300 text-xs">
                <div className='flex space-x-3 items-center'>
                    <div className="flex justify-center items-center h-[30px] w-[30px] rounded-full bg-gray-200 p-2">
                        <svg role="img" fill='#222' height="14" width="14" viewBox="0 0 16 16"><path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path>
                        </svg>
                    </div>

                    <div>{format(new Date(release_date), 'MMM yyyy')} - {millisToMinutesAndSeconds(duration_ms)} sec</div>
                </div>
                <DeleteOutlined className='h-10 flex items-center cursor-pointer' />
            </div>
        </div>
    </div>
  )
}

export default EpisodeItem