import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Sidebar from './Sidebar'

function Layout({ children }) {
  const { data: session }: any = useSession()
  return (
    <>
      <div className="layout grid">
        <div className="nav-bar">
          <Sidebar />
        </div>
        <div className="main-view h-[calc(100vh-90px)] overflow-hidden bg-gradient-to-r from-[#2e2e2e] to-[#2e2e2e]">
          <div className="pb-6 overflow-auto h-full">
            {{ ...children }}
          </div>
        </div>

        {/* <div className="now-playing-bar sticky bottom-0 left-0 right-0">
          <WebPlayback accessToken={session.accessToken} />
        </div> */}
      </div>
    </>
  )
}

export default Layout
