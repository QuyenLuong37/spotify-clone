import React from 'react'
import Track from './Track';

function FeaturePlaylists({featurePlaylist}) {
    
    return (
        <div>
            <div className='text-[28px] xxl:text-3xl font-semibold mb-4 '>{featurePlaylist.message}</div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-6'>
                    {featurePlaylist?.playlists?.items?.map((item, index) => {
                        return (
                            <Track key={index} id={item?.id} name={item?.name} images={item?.images} artist={item?.description}  type={item?.type} uri={item?.uri} />
                        )
                    })}
                </div>
        </div>
    )
}

export default FeaturePlaylists
