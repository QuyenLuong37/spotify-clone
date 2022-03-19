import { Tooltip } from 'antd'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useRecoilValue } from 'recoil';
import { currentTrackIsPlayingState } from '../recoil/currentTrackAtom';
import MediaPlayButton from './MediaPlayButton';

function Track({ name, images, artist, type, id, uri }) {
  let img;
  const currentTrack: any = useRecoilValue(currentTrackIsPlayingState)
  const router = useRouter();
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
      <div onClick={() => router.push(`/${type}/${id}`)} className="group  cursor-pointer rounded bg-[#3b3b3b] p-4 pb-6 shadow-xl transition duration-200 hover:bg-[#535353]">
        <div className="relative flex justify-center">
          <div className="relative mb-3 w-24 h-24 md:w-32 md:h-32 xl:w-34 xl:h-34 2xl:w-40 2xl:h-44">
            {img}
          </div>
          {(type !== 'show' && type !== 'episode') && <div className={currentTrack?.context?.uri === uri && !currentTrack?.paused ? 'transition duration-200 absolute bottom-2 right-2' : "absolute bottom-2 right-2 hidden transition duration-200 group-hover:block"}>
            <MediaPlayButton uri={uri} />
          </div>}
        </div>
        {name && <Tooltip placement="bottomLeft" title={name}>
          <div className="font-bold line-clamp-1">{name}</div>
        </Tooltip>}
        {artist && <div className="text-gray-400 line-clamp-2 text-xs">{artist}</div>}
        {type === 'artist' && <div className="text-gray-400">Artist</div>}
      </div>
    // <Link href={`/${type}/${id}`}>
    // </Link>
  )
}

export default Track
