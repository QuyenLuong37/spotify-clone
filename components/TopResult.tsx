import { Tooltip } from 'antd'
import Image from 'next/image'
import React from 'react'
import MediaPlayButton from './MediaPlayButton'
import MediaTableRow from './MediaTableRow'

function TopResult({album, songs}) {
  return (
    <div className='grid grid-cols-[minmax(200px,400px)_1fr] gap-10'>
       <div>
         <h3 className='capitalize font-bold text-white mb-2 text-2xl'>Top result</h3>
         <div className='group p-5 bg-[#222121] transition duration-200 hover:bg-[#181818] cursor-pointer rounded space-y-2 relative shadow-lg'>
            <div className='relative w-28 h-28'>
               {album?.images?.[0]?.url && <Image className=' rounded' src={album?.images?.[0]?.url} objectFit="cover" layout='fill' />}
            </div>

            <div>
               <Tooltip placement="topRight" title={album?.name}>
                  <div className="text-4xl font-bold line-clamp-1">{album?.name}</div>
               </Tooltip>
               <div className="font-medium text-gray-400">{album?.artists?.[0]?.name}</div>
            </div>

            <div className="hidden transition duration-200 group-hover:block absolute bottom-5 right-5">
               <MediaPlayButton uri={album?.uri} />
            </div>
         </div>
       </div>

       <div>
         <h3 className='capitalize font-bold text-white mb-2 text-2xl'>Songs</h3>
         {songs?.map((item, index) => {
            return (
               <MediaTableRow index={index} track={{...item, trackImg: item.album.images[0].url}} uri={item?.album?.uri} colsVisible={['title', 'duration']} key={index} />
           )
         })}
         
       </div>
    </div>
  )
}

export default TopResult