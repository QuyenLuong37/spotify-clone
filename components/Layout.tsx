import { useSession } from 'next-auth/react'
import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Sidebar from './Sidebar'
import WebPlayback from './WebPlayback'

function Layout({ children }) {
  const { data: session }: any = useSession()
  return (
    <>
      <main className="flex  h-screen">
        {/* Sidebar */}
        <Sidebar />
        {/* Center */}
        <div className="h-full flex-grow bg-gray-900  ">
          <header className="absolute top-0 right-0 cursor-pointer p-2 text-white">
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

          {session && <WebPlayback accessToken={session.accessToken} />}
        </div>
      </main>

      <div>{/* Player */}</div>
    </>
  )
}

export default Layout
