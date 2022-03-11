import { ClockIcon } from '@heroicons/react/solid'
import React from 'react'

function MediaTableHeader() {
  return (
    <div className="uppercase text-sm font-medium grid grid-cols-[[index]_40px_[first]_6fr_[var1]_4fr_[var2]_3fr_[last]_minmax(120px,1fr)] gap-4 items-center px-4 border-b border-gray-700 pb-4">
            <div className="flex justify-center">#</div>
            <div>Title</div>
            <div>Album</div>
            <div>Date Added</div>
            <div className="flex justify-center"><ClockIcon className='h-5' /></div>
          </div>
  )
}

export default MediaTableHeader