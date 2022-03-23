// pages/_middleware.ts

import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req: any) {
  
  const token = await getToken({
    req,
    secret: process.env.SPOTIFY_CLIENT_SECRET,

  })
  // 
  const { pathname } = req.nextUrl
  if (pathname.includes('/api/auth')) {
    return NextResponse.next()
  }

  if (token) {
    return NextResponse.next()
  } else {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.rewrite(url)
  }
}
