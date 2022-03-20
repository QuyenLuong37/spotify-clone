import { Empty, Input } from 'antd';
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import useSpotify from '../hook/useSpotify'
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import Genres from '../components/Genres';
import Track from '../components/Track';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import TopResult from '../components/TopResult';
function search() {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult]: any = useState({});
    const [categories, setCategories] = useState([]);
    const router = useRouter()
    
    useEffect(() => {
        const {query} = router.query;
        if (query) {
            setSearchInput(decodeURI(query as string));
            debounceDropDown(query);
        }
    }, [session, router.query])
    
    useEffect(() => {
        if (session) {
            spotifyApi.getCategories({limit: 50, country: 'VN'}).then((res: any) => {
                setCategories(res?.body?.categories?.items ?? []);
            })
        }
    }, [session])
    const debounceDropDown = useCallback(_.debounce((val) => {
        spotifyApi.search(val, ['track', 'album', 'episode', 'show', 'artist', 'playlist'], {limit: 10}).then(async (res) => {
            const trackIds = res.body.tracks?.items.map(item => item.id);
            let checkUserSavedTracks;
            if (trackIds && trackIds.length) {
                checkUserSavedTracks = await spotifyApi.containsMySavedTracks(trackIds as string[]);
            }
            const result = {
                ...res.body,
                tracks: {
                    ...res.body.tracks,
                    items: res.body.tracks?.items.map((item, index) => {
                        return {
                            ...item,
                            isSaved: checkUserSavedTracks && checkUserSavedTracks.body[index]
                        }
                    })
                }
            }
            setSearchResult(result);
            console.log("🚀 search: ", result)
        })
    }, 1000), [])
    
    const handleSearch = (value) => {
        router.replace('/search', {query: {query: decodeURI(value)}, }, {shallow: true})
        setSearchInput(value);
        if (value) {
            debounceDropDown(value);
        }
    }
  return (
        <div>
            <Header />
            <div className='flex flex-col text-white p-6'>
                <Input value={searchInput} onChange={(e) => handleSearch(e.target.value)} placeholder='Type your search....' />
                {!searchInput && (
                    <div className='mt-5'>
                        <h3 className='text-xl font-bold text-white mb-2'>Browse all</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
                            {categories && categories.length && categories.map((item: any, index: number) => {
                                return (
                                    <Genres name={item?.name} image={item?.icons?.[0]?.url} key={index} />
                                )
                            })}
                        </div>

                    </div>
                )}

                {searchInput && (searchResult?.track?.items?.length || searchResult?.album?.items?.length || searchResult?.artists?.items?.length || searchResult?.episodes?.items?.length || searchResult?.playlists?.items?.length) ? (
                    <div className='mt-5 space-y-5'>
                        <TopResult album={searchResult?.albums?.items?.[0]} songs={searchResult?.tracks?.items?.slice(0, 4)} />

                        {Object.keys(searchResult).map((key, index) => {
                            if (key === 'tracks') {
                                return null;
                            }
                            return <div key={index}>
                                <h3 className='capitalize font-bold text-lg text-white mb-2'>{key}</h3>
                                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-6'>
                                    {searchResult?.[key]?.items?.map((item, i) => {
                                        return  <Track key={i} id={item?.id} name={item?.name} images={item?.images} artist={item?.artists?.[0]?.name} type={item?.type} uri={item?.uri} />
                                    })}
                                </div>

                            </div>
                        })}
                    </div>
                ) : <div className='mt-16'><Empty /></div>}
            </div>
        </div>
  )
}

export default search

search.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout>
        {page}
      </Layout>
    )
}