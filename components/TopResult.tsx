import { Tooltip } from 'antd'
import Image from 'next/image'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { currentTrackIsPlayingState } from '../recoil/currentTrackAtom'
import MediaPlayButton from './MediaPlayButton'
import MediaTableRow from './MediaTableRow'

function TopResult({album, songs}) {
   const currentTrack: any = useRecoilValue(currentTrackIsPlayingState)
  return (
    <div className='grid grid-cols-[minmax(100px,250px)_1fr] lg:grid-cols-[minmax(120px,300px)_1fr] xl:grid-cols-[minmax(150px,350px)_1fr] gap-10'>
       <div>
         <h3 className='capitalize font-bold text-white mb-2 text-xl 2xltext-2xl'>Top result</h3>
         <div className={'group p-5 bg-[#222121] transition duration-200 hover:bg-[#181818] cursor-pointer rounded space-y-2 relative shadow-lg'}>
            <div className='relative w-24 h-24 2xl:w-28 2xl:h-28'>
               {album?.images?.[0]?.url && <Image className=' rounded' src={album?.images?.[0]?.url} objectFit="cover" layout='fill' />}
            </div>

            <div>
               <Tooltip placement="topRight" title={album?.name}>
                  <div className="text-2xl 2xl:text-4xl font-bold line-clamp-1">{album?.name}</div>
               </Tooltip>
               <div className="font-medium text-gray-400">{album?.artists?.[0]?.name}</div>
            </div>

            <div className={currentTrack?.context?.uri === album?.uri && !currentTrack?.paused ? " transition duration-200 absolute bottom-5 right-5" : "hidden transition duration-200 group-hover:block absolute bottom-5 right-5"}>
               <MediaPlayButton uri={album?.uri} />
            </div>
         </div>
       </div>

       <div>
         <h3 className='capitalize font-bold text-white mb-2 text-xl 2xltext-2xl'>Songs</h3>
         {songs?.map((item, index) => {
            return (
               <MediaTableRow index={index} track={{...item, trackImg: item.album.images[0].url}} uri={item?.album?.uri} colsVisible={['ordinal', 'title', 'duration']} hasOffset={false} key={index} />
           )
         })}
         
       </div>
    </div>
  )
}

export default TopResult