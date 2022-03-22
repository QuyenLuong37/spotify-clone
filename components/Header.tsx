import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { Dropdown, Menu } from 'antd'
import { signOut, useSession } from 'next-auth/react';
import React from 'react'
const isChildNull = children => {
    return Boolean(!children?.type);
  };
function Header({children}: any) {
    console.log("🚀Header runnn")
    const { data: session }: any = useSession()

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
    <header className="sticky top-0 z-20 flex cursor-pointer justify-between bg-[#2e2e2e] p-4 text-white shadow-sm">

        <div className="flex items-center space-x-10">
            <div className="flex  space-x-3">
                <div onClick={() => window.history.back()} className="h-8 w-8 rounded-full flex justify-center items-center bg-gray-900 transition duration-200 hover:bg-black">
                <ChevronLeftIcon className='h-5' />
                </div>

                <div onClick={() => window.history.forward()} className="h-8 w-8 rounded-full flex justify-center items-center bg-gray-900 transition duration-200 hover:bg-black">
                <ChevronRightIcon className='h-5' />
                </div>
            </div>
            {!isChildNull(children) && {...children}}
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