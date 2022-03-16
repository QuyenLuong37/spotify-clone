import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { Dropdown, Menu } from 'antd'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react'

function Header() {
    const { data: session }: any = useSession()
    const [tabSelected, setTabSelected] = useState('playlists');

    const menu = (
      <Menu>
        <Menu.Item key="0">
          <p >Profile</p>
        </Menu.Item>
        <Menu.Item key="1">
        <p onClick={() => signOut()}>Sign out</p>
        </Menu.Item>
      </Menu>
    );
  return (
    <header className="sticky top-0 z-10 flex cursor-pointer justify-between bg-[#2e2e2e] p-4 text-white shadow-sm">

        <div className="flex items-center space-x-10">
            <div className="flex  space-x-3">
                <div onClick={() => window.history.back()} className="h-8 w-8 rounded-full flex justify-center items-center bg-gray-900 transition duration-200 hover:bg-black">
                <ChevronLeftIcon className='h-5' />
                </div>

                <div onClick={() => window.history.forward()} className="h-8 w-8 rounded-full flex justify-center items-center bg-gray-900 transition duration-200 hover:bg-black">
                <ChevronRightIcon className='h-5' />
                </div>
            </div>

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
        </div>

        <Dropdown overlay={menu} trigger={['click']}>
            <div className="flex items-center space-x-2 rounded-3xl  bg-[#545454] h-10 px-2">
                <img
                    src={session?.user?.image}
                    className="h-7 rounded-full"
                    alt=""
                />
                <span className="text-sm font-bold">{session?.user?.name}</span>
                <ChevronDownIcon className="h-6" />
            </div>
        </Dropdown>
        
    </header>
  )
}

export default Header