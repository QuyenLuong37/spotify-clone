import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Sidebar from './Sidebar'
import WebPlayback from './WebPlayback'
import { Button, Dropdown, Menu, Popover } from 'antd'
import useSpotify from '../hook/useSpotify'
import { LeftOutlined } from '@ant-design/icons';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/outline'
import InfiniteScroll from 'react-infinite-scroll-component'
import Header from './Header'

function Layout({ children }) {
  const { data: session }: any = useSession()

  if (!session) {
    return null
  }
  return (
    <>
      <div className="layout grid">
        <div className="nav-bar">
          <Sidebar />
        </div>
        <div className="main-view h-[calc(100vh-90px)] overflow-hidden bg-gradient-to-r from-[#2e2e2e] to-[#2e2e2e]">
          <Header />
          <div className="pb-6 overflow-auto" style={{height: 'calc(100vh - 162px)'}}>
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
