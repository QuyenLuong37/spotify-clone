import { useSession } from 'next-auth/react'
import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Sidebar from './Sidebar'
import WebPlayback from './WebPlayback'

function Layout({ children }) {
  const { data: session }: any = useSession()
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
          <header className="absolute top-0 right-8 cursor-pointer p-2 text-white">
            <div className="flex items-center space-x-2 rounded-full bg-gray-900 p-2">
              <img
                src={session?.user?.image}
                className="h-7 rounded-full"
                alt=""
              />
              <span className="text-sm font-bold">{session?.user?.name}</span>
              <ChevronDownIcon className="h-6" />
            </div>
          </header>
          {{ ...children }}
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
