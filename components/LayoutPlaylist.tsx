import { Empty } from 'antd';
import React from 'react'
import Header from './Header';
import MediaPlayButton from './MediaPlayButton';
import MediaSummary from './MediaSummary'
import MediaTableHeader from './MediaTableHeader'
import MediaTableRow from './MediaTableRow'

function LayoutPlaylist({description, name,followerCount,ownerImg, type, playlistImg, uri, tracks, trackTotal, owner, colsVisible}) {
    return (
        <div className="text-white">
            
            <Header />
            <MediaSummary
                description={description}
                followerCount={followerCount}
                name={name}
                ownerImg={ownerImg}
                playlistImg={playlistImg}
                trackTotal={trackTotal}
                fromColor={'#066552'}
                toColor={'#1f2937'}
                type={type}
                owner={owner ? [owner] : null}
                totalSuffix={'song'}
            />
            <div className='space-y-6'>
                {uri && <div className="px-6 pt-6">
                    {tracks && tracks.length > 0 && <MediaPlayButton uri={uri} />}
                </div>}
                <div className="px-6">
                    <MediaTableHeader colsVisible={colsVisible} />
                    {tracks && tracks.length > 0 ? tracks?.map((item, index) => {
                        return (
                            <MediaTableRow
                                index={index}
                                uri={uri}
                                key={index}
                                track={item}
                                colsVisible={colsVisible}
                            />
                        )
                    }) : <div className='mt-16'><Empty /></div>}
                </div>
            </div>
        </div>
    )
}

export default LayoutPlaylist