import { ClockIcon } from '@heroicons/react/solid'
import React from 'react'

function MediaTableHeader({cols}) {
  if (cols === 5) {
    return (
      <div className='media-table-header-cols-5'>
        <div className="flex justify-center">#</div>
        <div>Title</div>
        <div>Album</div>
        <div>Date Added</div>
        <div className="flex justify-center"><ClockIcon className='h-5' /></div>
      </div>
    )
  }
  return (
    <div className='media-table-header-cols-3'>
      <div className="flex justify-center">#</div>
      <div>Title</div>
      <div className="flex justify-center"><ClockIcon className='h-5' /></div>
    </div>
  )
}

export default MediaTableHeader