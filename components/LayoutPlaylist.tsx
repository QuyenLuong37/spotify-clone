import React from 'react'
import useSpotify from '../hook/useSpotify';
import MediaPlayButton from './MediaPlayButton';
import MediaSummary from './MediaSummary'
import MediaTableHeader from './MediaTableHeader'
import MediaTableRow from './MediaTableRow'

function LayoutPlaylist({description, name,followerCount,ownerImg, type, playlistImg, uri, tracks, owner, colsVisible}) {
    return (
        <div className="text-white">
            <MediaSummary
                description={description}
                followerCount={followerCount}
                name={name}
                ownerImg={ownerImg}
                playlistImg={playlistImg}
                trackCount={tracks?.length ?? 0}
                fromColor={'#066552'}
                toColor={'#1f2937'}
                type={type}
                owner={owner}
            />
            <MediaPlayButton uri={uri} />
            <MediaTableHeader colsVisible={colsVisible} />
            {tracks?.map((item, index) => {
                return (
                    <MediaTableRow
                        index={index}
                        uri={uri}
                        key={index}
                        track={item}
                        colsVisible={colsVisible}
                    />
                )
            })}
        </div>
    )
}

export default LayoutPlaylist