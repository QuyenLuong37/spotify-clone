import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Genres({id, name, image}) {
  return (
    <Link href={`/browse/${id}`}>
      <div className='relative shadow-sm cursor-pointer p-2 bg-[#404040] rounded-md hover:bg-[#4e4e4e]'>
          <div className='text-heading absolute top-3 left-4 z-10 line-clamp-1'>{name}</div>
          <div className="relative h-[200px] rounded-lg">
              <Image src={image} className="" layout='fill' objectFit='cover' objectPosition='center' />
          </div>
      </div>
    </Link>
  )
}

export default Genres