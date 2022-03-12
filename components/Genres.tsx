import Image from 'next/image'
import React from 'react'

function Genres({name, image}) {
  return (
    <div className='relative shadow-sm cursor-pointer p-2 bg-[#404040] rounded-md hover:bg-[#4e4e4e]'>
        <div className='font-bold text-white text-lg absolute top-3 left-4 z-10 line-clamp-1'>{name}</div>
        <div className="relative h-[200px] rounded-lg">
            <Image src={image} className="" layout='fill' />
        </div>
    </div>
  )
}

export default Genres