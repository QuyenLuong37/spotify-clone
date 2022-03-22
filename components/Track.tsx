import { Tooltip } from 'antd'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useRecoilValue } from 'recoil';
import ArtistIconDefault from '../icons/ArtistIconDefault';
import EpisodeIcon from '../icons/EpisodeIcon';
import MusicIconDefault from '../icons/MusicIconDefault';
import { currentTrackIsPlayingState } from '../recoil/currentTrackAtom';
import MediaPlayButton from './MediaPlayButton';

function Track({ name, images, artist, type, id, uri, allowNavigate = true }) {
  let img;
  const currentTrack: any = useRecoilValue(currentTrackIsPlayingState)
  const router = useRouter();
  if (images?.[0]?.url) {
    if (type === 'artist') {
      img = <Image
        src={images?.[0]?.url}
        layout='intrinsic'
        className="rounded-full"
        objectFit="cover"
        objectPosition='center'
        width={200}
        height={200}
        priority
      />
    } else {
      img = <Image
        src={images?.[0]?.url}
        layout='fill'
        className='rounded'
        objectFit="cover"
        objectPosition='center'
        priority
      />
    }
  } else {
    if (type === 'artist') {
      img = <ArtistIconDefault className="w-full h-full" />
    }  else if (type === 'episode') {
      // img = <div className='h-full w-full bg-contain bg-center bg-no-repeat bg-[url("/episode.svg")]'></div>
      img = <EpisodeIcon className="w-full h-full" />
    } else {
      img = <MusicIconDefault className="w-full h-full" />
    }
  }
  return (
      <div onClick={(e) => allowNavigate ? router.push(`/${type}/${id}`) : null} className="group  cursor-pointer rounded bg-[#3b3b3b] p-4 pb-6 shadow-xl transition duration-200 hover:bg-[#535353]">
        <div className="relative flex justify-center">
          <div className="relative mb-3 w-24 h-24 md:w-32 md:h-32 xl:w-34 xl:h-34 2xl:w-40 2xl:h-44 p-2 flex justify-center items-center">
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
  )
}

export default Track
