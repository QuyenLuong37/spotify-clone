import React from 'react'
import useSpotify from '../hook/useSpotify';
import MediaSummary from './MediaSummary'
import MediaTableHeader from './MediaTableHeader'
import MediaTableRow from './MediaTableRow'

function LayoutPlaylist({description, name,followerCount,ownerImg,ownerName, type, playlistImg, uri, tracks}) {
    const spotifyApi = useSpotify();
    const play = () => {
        spotifyApi.play({ context_uri: uri }).then((res) => {})
    }
    return (
        <div className="text-white">
        <MediaSummary
            description={description}
            followerCount={followerCount}
            name={name}
            ownerImg={ownerImg}
            ownerName={ownerName}
            playlistImg={playlistImg}
            trackCount={tracks?.length ?? 0}
            fromColor={'#066552'}
            toColor={'#1f2937'}
            type={type}
        />
            <div className="px-8 py-6">
            <div
                onClick={() => play()}
                className="flex h-12 w-12 transform cursor-pointer items-center justify-center rounded-full bg-green-400 p-3 text-white transition duration-150 hover:scale-110"
            >
                <svg
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                height="100%"
                width="100%"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                >
                <path d="M4.018 14L14.41 8 4.018 2z"></path>
                </svg>
            </div>
            </div>
            <MediaTableHeader cols={type === 'playlist' ? 5 : 3} />
            {tracks?.map((item, index) => {
            return (
                <MediaTableRow
                    index={index}
                    uri={uri}
                    key={index}
                    track={item}
                    cols={type === 'playlist' ? 5 : 3}
                    />
                )
            })}
        </div>
    )
}

export default LayoutPlaylist