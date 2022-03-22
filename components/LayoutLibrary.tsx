import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Header from './Header'

function LayoutLibrary({children}) {
    const router = useRouter();

    return (
            <div>
                <Header>
                    <div className='flex space-x-6'>
                            <Link href='/collection/playlists'>
                                <div className={router.pathname.includes('playlists') ? 'tabSelected' : 'tabUnSelected'} >
                                    <span>Playlist</span>
                                </div>
                            </Link>
                            <Link href='/collection/podcasts'>
                                <div className={router.pathname.includes('podcasts') ? 'tabSelected' : 'tabUnSelected'} >
                                    <span>Podcasts</span>
                                </div>
                            </Link>
                            <Link href='/collection/artists'>
                                <div className={router.pathname.includes('artists') ? 'tabSelected' : 'tabUnSelected'} >
                                    <span>Artists</span>
                                </div>
                            </Link>
                            <Link href='/collection/albums'>
                                <div className={router.pathname.includes('albums') ? 'tabSelected' : 'tabUnSelected'} >
                                    <span>Albums</span>
                                </div>
                            </Link>
                    </div>
                </Header>

                <div className='px-6 mt-6'>
                    {{...children}}
                </div>
            </div>
    )
}

export default LayoutLibrary