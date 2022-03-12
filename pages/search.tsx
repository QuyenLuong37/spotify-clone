import { Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import useSpotify from '../hook/useSpotify'
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import Genres from '../components/Genres';
import Track from '../components/Track';
function search() {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState({});
    const [genres, setGenres] = useState([]);
    const [categories, setCategories] = useState([]);
    console.log('categories: ', categories);
    
    useEffect(() => {
        if (session) {
            spotifyApi.getCategories({limit: 50, country: 'VN'}).then((res: any) => {
                setCategories(res?.body?.categories?.items ?? []);
                console.log('categories: ', res?.body?.categories?.items);
            })
        }
    }, [session])
    const debounceDropDown = useCallback(_.debounce((val) => {
        spotifyApi.search(val, ['track', 'album', 'episode', 'show', 'artist', 'playlist'], {market: 'VN', include_external: 'audio', limit: 10}).then(res => {
            console.log('search res: ', res);
            setSearchResult(res.body);
        })
    }, 1000), [])
    
    const handleSearch = (value) => {
        setSearchInput(value);
        debounceDropDown(value);
    }
  return (
    <Layout>
        <div className='flex flex-col space-y-5 text-white p-6'>
            <Input value={searchInput} onChange={(e) => handleSearch(e.target.value)} placeholder='Type your search....' />
            {!searchInput && (
                <div>
                    <h3 className='text-xl font-bold text-white mb-2'>Browse all</h3>
                    <div className="grid grid-cols-4 md:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
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
                            <div className='grid grid-cols-4 md:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6'>
                                {searchResult?.[key]?.items?.map((item, i) => {
                                    if (key === 'tracks') {
                                        return  <Track key={i} name={item?.name} images={item?.album?.images} artist={item?.artists?.[0]?.name} />
                                    }
                                    return  <Track key={i} name={item?.name} images={item?.images} artist={item?.artists?.[0]?.name} />
                                })}
                            </div>

                        </div>
                    })}
                </div>
            )}
        </div>
    </Layout>
  )
}

export default search