import React from 'react'
import Track from './Track';

function FeaturePlaylists({featurePlaylist}) {
    console.log('playlists: ', featurePlaylist);
    return (
        <div>
            <div className='text-[28px] xxl:text-3xl font-semibold mb-6 text-gray-200'>{featurePlaylist.message}</div>
            <div className='grid grid-cols-4 md:grid-cols-5 xl:grid-cols-7 gap-6'>
                    {featurePlaylist?.playlists?.items?.map((item, index) => {
                        return (
                            <Track key={index} name={item?.name} images={item?.images} artist={item?.description} />
                        )
                    })}
                </div>
        </div>
    )
}

export default FeaturePlaylists
