import { Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import useSpotify from '../hook/useSpotify'
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import Genres from '../components/Genres';
function search() {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [search, setSearch] = useState('');
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
        spotifyApi.search(val, ['track', 'album', 'episode', 'show', 'artist', 'playlist'], {market: 'VN', include_external: 'audio', limit: 5}).then(res => {
            console.log('search res: ', res);
        })
    }, 1000), [])
    
    const handleSearch = (value) => {
        setSearch(value);
        debounceDropDown(value);
    }
  return (
    <Layout>
        <div className='text-white p-6'>
            <Input value={search} onChange={(e) => handleSearch(e.target.value)} placeholder='Type your search....' />
            <div className="grid grid-cols-4 md:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
                {categories && categories.length && categories.map((item: any, index: number) => {
                    return (
                        <Genres name={item?.name} image={item?.icons?.[0]?.url} key={index} />
                    )
                })}
            </div>
        </div>
    </Layout>
  )
}

export default search