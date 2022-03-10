import Image from 'next/image';
import React from 'react'

function MediaSummary({
  playlistImg,
  name,
  description,
  ownerImg,
  ownerName,
  followerCount,
  trackCount,
  type,
  fromColor = '',
  toColor = ''
}) {
  let trackCountUI;
  let followerCountUI;
  let playlistImgUI;
  
  switch (type) {
    case 'playlist':
      playlistImgUI = <img className="" src={playlistImg} alt="" />
      break;
    case 'episode':
      playlistImgUI = `<div className="p-10 bg-[#066552] h-[232px] shadow-lg rounded">
      <div className='h-full bg-cover bg-no-repeat bg-[url("/episode.svg")]'></div>
    </div>`
      break;
    case 'liked':
      playlistImgUI = <div className='relative h-[232px]'>
        <Image src={'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'} layout="fill" />
      </div>
      break;
    default:
      playlistImgUI = <div className="p-[4.5rem] bg-[#282828] h-[232px] shadow-lg rounded">
      <div className='h-full bg-cover bg-no-repeat bg-[url("/default.svg")]'></div>
    </div>
      break;
  }

  if (trackCount || trackCount === 0) {
    trackCountUI = <>
      <span> - </span>
      <span>{trackCount === 1 ? trackCount + ' song' : trackCount + ' songs'}</span>
    </>
  } else {
    trackCountUI = null;
  }
  if (followerCount || followerCount === 0) {
    followerCountUI = <>
      <span> - </span>
      <span>{followerCount === 1 ? followerCount + ' like' : followerCount + ' likes'} </span>
    </>
  } else {
    followerCountUI = null;
  }

  return (
      <div className="grid grid-cols-[minmax(200px,232px)_1fr] gap-x-4 h-80 items-end space-x-4 bg-gradient-to-b from-[#066552] to-gray-800 p-4">
        <div>
          {playlistImgUI}
          {/* <img className="" src={playlistImg} alt="" /> */}

          {/* <div className="p-10 bg-[#066552] h-[232px] shadow-lg rounded">
            <div className='h-full bg-cover bg-no-repeat bg-[url("/episode.svg")]'></div>
          </div> */}
        </div>
        <div className="space-y-4">
          <div className="font-medium uppercase">Playlist</div>
          <div className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            {name}
          </div>
          <div className="flex flex-col">
            <div className="text-sm text-gray-400">{description} </div>
            <div className="flex space-x-2 text-gray- mb-1">
              {ownerImg && (
                <img src={ownerImg} className="h-6 rounded-full" alt="" />
              )}
              <div className="flex items-center space-x-2 text-xs sm:text-sm">
                <span className="font-semibold text-white">{ownerName}</span>
                {followerCountUI}
                {trackCountUI}
                
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MediaSummary
