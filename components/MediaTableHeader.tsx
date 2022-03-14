import { ClockIcon } from '@heroicons/react/solid'
import React from 'react'

function MediaTableHeader({colsVisible}) {
  return (
    <div className='media-table-header-cols-5'>
      <div className="flex justify-center">#</div>
      <div className={colsVisible.includes('title') ? 'visible' : 'invisible'}>Title</div>
      <div className={colsVisible.includes('album') ? 'visible' : 'invisible'}>Album</div>
      <div className={colsVisible.includes('added_at') ? 'visible' : 'invisible'}>Date Added</div>
      <div className={colsVisible.includes('duration') ? 'visible' : 'invisible'}>
        <div className="flex justify-center"><ClockIcon className='h-5' /></div>
      </div>
    </div>
  )
}

export default MediaTableHeader