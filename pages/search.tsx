import { Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import useSpotify from '../hook/useSpotify'
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import Genres from '../components/Genres';
import Track from '../components/Track';
import { useRouter } from 'next/router';
import Header from '../components/Header';
function search() {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState({});
    const [genres, setGenres] = useState([]);
    const [categories, setCategories] = useState([]);
    const router = useRouter()
    
    useEffect(() => {
        const {query} = router.query;
        if (query) {
            setSearchInput(query as string);
            debounceDropDown(query);
        }
    }, [router.query])
    
    useEffect(() => {
        if (session) {
            spotifyApi.getCategories({limit: 50, country: 'VN'}).then((res: any) => {
                setCategories(res?.body?.categories?.items ?? []);
            })
        }
    }, [session])
    const debounceDropDown = useCallback(_.debounce((val) => {
        spotifyApi.search(val, ['track', 'album', 'episode', 'show', 'artist', 'playlist'], {market: 'VN', include_external: 'audio', limit: 10}).then(res => {
            
            setSearchResult(res.body);
        })
    }, 1000), [])
    
    const handleSearch = (value) => {
        router.push('/search', {query: {query: encodeURI(value)}, })
        setSearchInput(value);
        if (value) {
            debounceDropDown(value);
        }
    }
  return (
        <div>
            <Header />
            <div className='flex flex-col space-y-5 text-white p-6'>
                <Input value={searchInput} onChange={(e) => handleSearch(e.target.value)} placeholder='Type your search....' />
                {!searchInput && (
                    <div>
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

                {searchInput && (
                    <div className='space-y-5'>
                        {Object.keys(searchResult).map((key, index) => {
                            return <div key={index}>
                                <h3 className='capitalize font-bold text-lg text-white mb-2'>{key}</h3>
                                {/* {JSON.stringify(searchResult)} */}
                                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-6'>
                                    {searchResult?.[key]?.items?.map((item, i) => {
                                        if (key === 'tracks') {
                                            return  <Track key={i} id={item?.id} name={item?.name} images={item?.album?.images} artist={item?.artists?.[0]?.name} type={item?.type} />
                                        }
                                        return  <Track key={i} id={item?.id} name={item?.name} images={item?.images} artist={item?.artists?.[0]?.name} type={item?.type} />
                                    })}
                                </div>

                            </div>
                        })}
                    </div>
                )}
            </div>
        </div>
  )
}

export default search

