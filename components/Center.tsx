import { ArrowCircleLeftIcon, UserCircleIcon } from '@heroicons/react/outline'
import { getProviders, signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import WebPlayback from './WebPlayback';

function Center() {
    const {data: session, status}: any = useSession();
    
  return (
    <div className='text-white bg-gray-900 h-full '>
        <header className='sticky  top-0  w-full px-3 py-4'>
            <div className='flex justify-between items-center'>
                {session && <button onClick={() => signOut()} className='px-4  py-1 rounded cursor-pointer bg-gray-400'>Sign out</button>}
                
                {!session && <div>
                     
                    <button onClick={() => signIn()} className='px-4  py-1 rounded cursor-pointer bg-gray-400'>
                    Sign in
                    </button>
                </div>}
            </div>
        </header>
        {session && <WebPlayback accessToken={session.accessToken} /> }
        <div className='p-3'>
            <div>
                <h2 className='text-2xl font-semibold'>Good afternoon</h2>

                <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-4 text-sm">
                    <div className='p-3  rounded bg-[#2d293b] transition duration-200 hover:bg-[#656175] cursor-pointer'>Liked Songs</div>
                    <div className='p-3  rounded bg-[#2d293b] transition duration-200 hover:bg-[#656175] cursor-pointer'>Lên nóc nhà</div>
                    <div className='p-3  rounded bg-[#2d293b] transition duration-200 hover:bg-[#656175] cursor-pointer'>Nhạc remix </div>
                    <div className='p-3  rounded bg-[#2d293b] transition duration-200 hover:bg-[#656175] cursor-pointer'>Mega hit</div>
                </div>
            </div>
        </div>
    </div>
  )
}

  export default Center;