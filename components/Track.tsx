import { Button, Tooltip } from 'antd'
import Image from 'next/image'
import React from 'react'

function Track({ name, images, artist }) {
  return (
    <div className="cursor-pointer rounded bg-[#3b3b3b] p-4 shadow-lg transition duration-200 hover:bg-[#535353]">
      <div className="group relative">
        <div className="relative mb-3 h-40 w-full">
          <Image
            src={images?.[0]?.url}
            layout="fill"
            className="rounded"
            objectFit="cover"
            priority
          />
        </div>
        {/* <div className='absolute bottom-6 right-2 h-6'>
                <Button className='p-2 w-10 h-10'  shape="circle" icon={ <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M4.018 14L14.41 8 4.018 2z"></path>
                    </svg>} />

            </div> */}
        <button className="absolute bottom-2 right-2 hidden h-11 w-11 transform rounded-full bg-green-500 p-2 shadow-sm transition duration-200 hover:scale-105 group-hover:block">
          <svg
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
            height="100%"
            width="100%"
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
          >
            <path d="M4.018 14L14.41 8 4.018 2z"></path>
          </svg>
        </button>
      </div>
      <Tooltip placement="top" title={name}>
        <div className="font-bold line-clamp-1">{name}</div>
      </Tooltip>
      <div className="text-gray-400 line-clamp-2">{artist}</div>
    </div>
  )
}

export default Track
