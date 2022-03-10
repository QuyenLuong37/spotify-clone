import React from 'react'

function Greeting() {
    const h = new Date().getHours();
    return (
        <div className=''>
            <div className='text-[28px] xxl:text-3xl font-semibold mb-2 '>
                {h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good Evening'}
            </div>
            <p className='text-gray-300'>I built spotify with Nextjs, TailwindCSS and Ant design. I'm Quyen Luong!</p>
        </div>
    )
}

export default Greeting
