import { getSession, useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import useSpotify from '../hook/useSpotify'
import FeaturePlaylists from './FeaturePlaylists';
import Greeting from './Greeting';
import RecentPlayed from './RecentPlayed';

function HomePage() {
    const spotifyApi = useSpotify();
    const {data: session} = useSession();
    useEffect(() => {
        // Get tracks in the signed in user's Your Music library
        if (session) {
            console.log('spotifyApi: ', spotifyApi);
            spotifyApi.getMySavedTracks()
            .then((data) => {
                console.log('data: ', data);
            }, (err) => {
                console.log('Something went wrong!', err);
            });
    
            spotifyApi.getFeaturedPlaylists({country: 'VN'}).then(res => {
                console.log('getFeaturedPlaylists: ', res.body);
            })
        }
    }, [session, spotifyApi])
    return (
        <div className="text-white">
            <Greeting />

            {/* recent played */}
            <RecentPlayed />

            {/* Feature playlists */}
            <FeaturePlaylists />
        </div>
    )
}

export default HomePage;
