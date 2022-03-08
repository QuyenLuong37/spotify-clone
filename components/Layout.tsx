import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Sidebar from './Sidebar'
import WebPlayback from './WebPlayback'
import { Popover } from 'antd'

function Layout({ children }) {
  const { data: session }: any = useSession()
  const profile = (
    <div>
      <p>Profile</p>
      <p onClick={() => signOut()}>Sign out</p>
    </div>
  );
  if (!session) {
    return null
  }
  return (
    <>
      <div className="layout grid">
        {/* Sidebar */}
        <div className="nav-bar">
          <Sidebar />
        </div>
        {/* Center */}
        {/* <div className='overflow-auto main-view'>
          
          </div> */}

        <div className="main-view overflow-auto h-[calc(100vh-90px)] bg-gradient-to-r to-[#2e2e2e] from-[#121212]">
          <header className="sticky top-0 cursor-pointer p-2 text-white bg-[#313131] flex justify-end">
          <Popover content={profile} title={null} trigger="click">
            <div className="flex items-center space-x-2 rounded-full  p-2 bg-[#545454]">
              <img
                src={session?.user?.image}
                className="h-7 rounded-full"
                alt=""
              />
              <span className="text-sm font-bold">{session?.user?.name}</span>
              <ChevronDownIcon className="h-6" />
            </div>
          </Popover>
          </header>
          <div className='p-6'>
          {{ ...children }}
            </div>
        </div>

        <div className="now-playing-bar sticky bottom-0 left-0 right-0">
          <WebPlayback accessToken={session.accessToken} />
        </div>

        {/* <div className="bg-gray-900" style={{width: "calc(100vw - 241px)"}}>

          <WebPlayback accessToken={session.accessToken} />
        </div> */}
      </div>

      <div>{/* Player */}</div>
    </>
  )
}

export default Layout
