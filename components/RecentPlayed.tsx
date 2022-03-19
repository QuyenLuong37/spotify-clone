import React from 'react'
import Track from './Track';

function RecentPlayed({recentTracks}) {
    
    if (recentTracks && recentTracks.length) {
        return (
            <div>
                <div className='text-[28px] xxl:text-3xl font-semibold mb-4 '>Recently Played</div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-6'>
                    {recentTracks?.map((item, index) => {
                        return (
                            <Track key={index} id={item?.id} name={item?.track?.name} images={item?.track?.album?.images} artist={item?.track?.artists?.[0]?.name}  type={item?.type} />
                        )
                    })}
                </div>
            </div>
        )
    }

    return null;
    
}

export default RecentPlayed
