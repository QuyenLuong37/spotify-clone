import React from 'react'
import Track from './Track';

function NewRelease({newRelease}) {
    console.log('newRelease: ', newRelease);
    if (newRelease && newRelease.length) {
        return (
            <div>
                <div className='text-[28px] xxl:text-3xl font-semibold mb-6 '>New release album</div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-6'>
                    {newRelease?.map((item, index) => {
                        return (
                            <Track key={index} id={item?.id} name={item?.name} images={item?.images} artist={item?.artists?.[0]?.name} type={item?.type} />
                        )
                    })}
                </div>
            </div>
        )
    }

    return null;
}

export default NewRelease