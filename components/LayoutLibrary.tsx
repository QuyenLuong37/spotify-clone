import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Header from './Header'

function LayoutLibrary({children}) {
    const router = useRouter();
    console.log('router: ', router)
    const [tabSelected, setTabSelected] = useState('playlists');
    return (
            <div>
                <Header>
                    <div className='flex space-x-6'>
                        <div className={tabSelected === 'playlists' ? 'tabSelected' : 'tabUnSelected'} onClick={() => setTabSelected('playlists')}>
                            <Link href='/collection/playlists'>
                                <span>Playlist</span>
                            </Link>
                        </div>
                        <div className={tabSelected === 'podcasts' ? 'tabSelected' : 'tabUnSelected'} onClick={() => setTabSelected('podcasts')}>
                            <Link href='/collection/podcasts'>
                                <span>Podcasts</span>
                            </Link>
                        </div>
                        <div className={tabSelected === 'artists' ? 'tabSelected' : 'tabUnSelected'} onClick={() => setTabSelected('artists')}>
                            <Link href='/collection/artists'>
                                <span>Artists</span>
                            </Link>
                        </div>
                        <div className={tabSelected === 'albums' ? 'tabSelected' : 'tabUnSelected'} onClick={() => setTabSelected('albums')}>
                            <Link href='/collection/albums'>
                                <span>Albums</span>
                            </Link>
                        </div>
                    </div>
                </Header>
                {{...children}}
            </div>
    )
}

export default LayoutLibrary