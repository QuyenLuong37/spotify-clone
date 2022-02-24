// pages/_middleware.ts

import { NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export async function middleware(req: any) {
  const token = await getToken({
    req,
    secret: process.env.SPOTIFY_CLIENT_SECRET,
  })
  const { pathname } = req.nextUrl
  console.log('pathName: ', pathname)
  if (pathname.includes('/api/auth') || token) {
      return NextResponse.next()
    }
    console.log('midde ware: ', token);
  if (!token || pathname !== '/login') {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.rewrite(url)
  }
}
