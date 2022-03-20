import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import LayoutPlaylist from '../../components/LayoutPlaylist';
import Track from '../../components/Track';
import useSpotify from '../../hook/useSpotify';

function Album() {
    const router = useRouter();
    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [album, setAlbum]: any = useState({});
    const [artistAlbum, setArtistAlbum]: any = useState([]);
    useEffect(() => {
      const {id} = router.query;
      if (session && id) {
        spotifyApi.getAlbum(id as string).then(async (res) => {
          const trackIds = res.body.tracks.items.map(item => item.id);
          const checkUserSavedTracks = await spotifyApi.containsMySavedTracks(trackIds);
            const albumRes = {
                ...res.body,
                ownerName: res.body.artists.map(item => item.name).join(', '),
                tracks: res.body.tracks.items.map((item, index) => {
                  return {
                    ...item,
                    trackImg: null,
                    isSaved: checkUserSavedTracks.body[index]
                  }
                })
            }
            const artists = res.body.artists;
            if (artists.length) {
                spotifyApi.getArtistAlbums(artists[0].id, {limit: 10}).then(res => {
                    setArtistAlbum(res.body.items);
                })
                spotifyApi.getArtist(artists[0].id).then((user) => {
                    setAlbum({...albumRes, ownerImg: user.body.images});
                })
              } else {
                setAlbum(albumRes);
              }
        })
      }
    }, [session, router.query])
    

  return (
        <div>
            <LayoutPlaylist
                description={album?.description}
                followerCount={album?.followers?.total}
                name={album?.name}
                ownerImg={album?.ownerImg?.[0]?.url}
                // ownerName={album?.ownerName}
                playlistImg={album?.images?.[0]?.url}
                tracks={album?.tracks?.items}
                type="album"
                uri={album?.uri}
                owner={album?.artists}
                trackTotal={album?.total}
                colsVisible={['ordinal', 'title', 'duration']}
            />
           <div className="px-6 mt-8">
                <div className='text-heading text-2xl mb-3'>More by {album?.ownerName}</div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-6'>
                    {artistAlbum?.map((item, index) => {
                        return (
                            <Track key={index} id={item?.id} name={item?.name} images={item?.images} artist={null}  type={item?.type} uri={item?.uri} />
                        )
                    })}
                </div>
           </div>
        </div>
  )
}

export default Album

Album.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}