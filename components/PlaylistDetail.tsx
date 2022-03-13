import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import useSpotify from '../hook/useSpotify'
import { playlistIdState } from '../recoil/playlistAtom'
import LayoutPlaylist from './LayoutPlaylist'

function PlaylistDetail() {
  const { data: session, status }: any = useSession()
  const spotifyApi = useSpotify()
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist]: any = useState(null)
  useEffect(() => {
    if (playlistId) {
      spotifyApi.getPlaylist(playlistId).then((res) => {
        console.log('play list: ', res.body)
        const playlist = {
          ...res.body,
          tracks: {
            items: res.body.tracks.items.map(item => {
              return {
                ...item,
                ...item.track
              }
            })
          }
        }
        if (playlist.owner.id) {
          if (playlist.owner.id === session?.user?.id) {
            setPlaylist({
              ...playlist,
              ownerImg: [{ url: session?.user?.image }],
            })
          } else {
            spotifyApi.getUser(playlist.owner.id).then((user) => {
              setPlaylist({ ...playlist, ownerImg: user.body.images })
            })
          }
        }
      })
    }
  }, [playlistId])

  return (
    <LayoutPlaylist
      description={playlist?.description}
      followerCount={playlist?.followers?.total}
      name={playlist?.name}
      ownerImg={playlist?.ownerImg?.[0]?.url}
      ownerName={playlist?.owner?.display_name}
      playlistImg={playlist?.images?.[0]?.url}
      tracks={playlist?.tracks?.items}
      type="playlist"
      uri={playlist?.uri}
    />
  )
}

export default PlaylistDetail


    // <div className="text-white">
    //   <MediaSummary
    //     description={playlist?.description}
    //     followerCount={playlist?.followers?.total}
    //     name={playlist?.name}
    //     ownerImg={playlist?.ownerImg?.[0]?.url}
    //     ownerName={playlist?.owner?.display_name}
    //     playlistImg={playlist?.images?.[0]?.url}
    //     trackCount={playlist?.tracks?.items?.length}
    //     fromColor={'#066552'}
    //     toColor={'#1f2937'}
    //     type={'episode'}
    //   />
    //     <div className="px-8 py-6">
    //       <div
    //         onClick={() => playPlayList()}
    //         className="flex h-12 w-12 transform cursor-pointer items-center justify-center rounded-full bg-green-400 p-3 text-white transition duration-150 hover:scale-110"
    //       >
    //         <svg
    //           viewBox="0 0 16 16"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="#ffffff"
    //           height="100%"
    //           width="100%"
    //           preserveAspectRatio="xMidYMid meet"
    //           focusable="false"
    //         >
    //           <path d="M4.018 14L14.41 8 4.018 2z"></path>
    //         </svg>
    //       </div>
    //     </div>
    //     <MediaTableHeader />
    //     {playlist?.tracks?.items?.map((item, index) => {
    //       return (
    //         <MediaTableRow
    //           index={index}
    //           playlistUri={playlist?.uri}
    //           key={index}
    //           row={item}
    //         />
    //       )
    //     })}
    // </div>
