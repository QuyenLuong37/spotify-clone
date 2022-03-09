import React from 'react'
import Track from './Track';

function RecentPlayed({recentTracks}) {
    console.log('recentTracks: ', recentTracks);
    if (recentTracks && recentTracks.length) {
        return (
            <div>
                <div className='text-[28px] xxl:text-3xl font-semibold mb-6 text-gray-200'>Recently Played</div>
                <div className='grid grid-cols-4 md:grid-cols-5 xl:grid-cols-7 gap-6'>
                    {recentTracks?.map((item, index) => {
                        return (
                            <Track key={index} name={item?.track?.name} images={item?.track?.album?.images} artist={item?.track?.artists?.[0]?.name} />
                        )
                    })}
                </div>
            </div>
        )
    }

    return null;
    
}

export default RecentPlayed