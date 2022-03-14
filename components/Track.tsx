import { Button, Tooltip } from 'antd'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

function Track({ name, images, artist, type, id }) {
  let img;
  if (images?.[0]?.url) {
    img = <Image
      src={images?.[0]?.url}
      layout="fill"
      className={type === 'artist' ? 'rounded-full' : 'rounded'}
      objectFit="cover"
      priority
      objectPosition='center'
    />
  } else {
    if (type === 'artist') {
      img = <div className="h-full p-8 rounded-full bg-[#313131]">
        <div className='h-full bg-cover bg-center bg-no-repeat bg-[url("/artist-default.svg")]'></div>
      </div>
    } else {
      img = <div className="h-full p-8 rounded-full">
        <div className='h-full bg-cover bg-center bg-no-repeat bg-[url("/default.svg")]'></div>
      </div>
    }
  }
  return (
    <Link href={`/${type}/${id}`}>
      <div className="group  cursor-pointer rounded bg-[#3b3b3b] p-4 pb-8 shadow-lg transition duration-200 hover:bg-[#535353]">
        <div className="relative">
          <div className="relative mb-3 w-full h-40">
            {/* <Image
              src={images?.[0]?.url}
              layout="fill"
              className="rounded"
              objectFit="cover"
              priority
            /> */}
            {img}
          </div>
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
        <div className="text-gray-400 line-clamp-2 text-xs">{artist}</div>
        {type === 'artist' && <div className="text-gray-400">Artist</div>}
      </div>
    </Link>
  )
}

export default Track
