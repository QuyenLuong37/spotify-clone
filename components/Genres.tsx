import Image from 'next/image'
import React from 'react'

function Genres({name, image}) {
  return (
    <div className='relative shadow-sm shadow-white cursor-pointer'>
        <div className='font-bold text-white text-xl absolute top-[6px] left-2 z-10'>{name}</div>
        <div className="relative h-[200px] ">
            <Image src={image} className="rounded-xl" layout='fill' />
        </div>
    </div>
  )
}

export default Genres