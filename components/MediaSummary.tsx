import { Tooltip } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function MediaSummary({
  playlistImg,
  name,
  description,
  ownerImg,
  followerCount,
  trackTotal,
  type,
  owner,
  totalSuffix,
  fromColor = '',
  toColor = ''
}) {
  let trackTotalUI;
  let followerCountUI;
  let playlistImgUI;
  
  switch (type) {
    case 'album':
    case 'artist':
    case 'playlist':
    case 'podcast':
      playlistImgUI = <img className="rounded" src={playlistImg} alt="" />
      break;
    case 'episode':
      playlistImgUI = <div className="p-[4.5rem] w-full bg-[#066552] h-[232px] shadow-lg rounded">
      <div className='h-full bg-cover bg-no-repeat bg-[url("/episode.svg")]'></div>
    </div>
      break;
    case 'liked':
      playlistImgUI = <div className='relative h-[232px]'>
        <Image src={'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'} layout="fill" />
      </div>
      break;
    default:
      playlistImgUI = <div className="p-[4.5rem] w-full bg-[#282828] h-[232px] shadow-lg rounded">
      <div className='h-full bg-cover bg-no-repeat bg-[url("/default.svg")]'></div>
    </div>
      break;
  }

  if (trackTotal || trackTotal === 0) {
    trackTotalUI = <>
      <span> - </span>
      <span>{trackTotal === 1 ? `${trackTotal} ${totalSuffix}` : `${trackTotal} ${totalSuffix}s`}</span>
    </>
  } else {
    trackTotalUI = null;
  }
  if (followerCount || followerCount === 0) {
    followerCountUI = <>
      <span> - </span>
      <span>{followerCount === 1 ? followerCount?.toLocaleString() + ' like' : followerCount?.toLocaleString() + ' likes'} </span>
    </>
  } else {
    followerCountUI = null;
  }

  return (
      <div className="grid grid-cols-[minmax(200px,232px)_1fr] gap-x-4 h-80 items-end space-x-4 bg-gradient-to-b from-[#066552] to-gray-800 p-6">
        <div className='rounded'>
          {playlistImgUI}
        </div>
        <div className="space-y-3">
          <div className="font-medium uppercase">{type === 'liked' || type === 'playlist' ? 'Playlist' : type}</div>
          <div className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl">
            {name}
          </div>
          <div className="flex flex-col space-y-3">
            <div className="text-xs 2xl:text-sm text-gray-400 line-clamp-2">{description} </div>
            <div className="flex space-x-2 text-gray- mb-1">
              {ownerImg && (
                <img src={ownerImg} className="h-6 rounded-full" alt="" />
              )}
              <div className="flex items-center space-x-2 text-xs sm:text-sm">
                {owner?.map((item, index) => {
                  return (
                    <Link key={index} href={`/${item.type}/${item.id}`} >
                      <div className=''>
                        <span className="font-semibold text-white cursor-pointer transition duration-200 hover:underline">{item.name}</span> {owner.length - 1 !== index && <span>, </span>}
                      </div>
                    </Link>
                  )
                })}
                {/* <span onClick={() => handleNavigateCallback()} className="font-semibold text-white cursor-pointer transition duration-200 hover:underline">{owner?.map(item => item?.name)?.join(', ')}</span> */}
                {followerCountUI}
                {trackTotalUI}
                
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MediaSummary
