import { Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import useSpotify from '../hook/useSpotify'
import _ from 'lodash';
function search() {
    const spotifyApi = useSpotify();
    const [search, setSearch] = useState('');
    // useEffect(() => {
    //     spotifyApi.search()
    // }, [])
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
        <div className='text-white'>
            <Input value={search} onChange={(e) => handleSearch(e.target.value)} placeholder='Type your search....' />
        </div>
    </Layout>
  )
}

export default search