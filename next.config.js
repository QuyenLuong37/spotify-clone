/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      'scontent-hkt1-1.xx.fbcdn.net',
      'i.scdn.co',
      't.scdn.co',
      'daily-mix.scdn.co',
      'newjams-images.scdn.co',
      'mosaic.scdn.co',
      'seeded-session-images.scdn.co',
      'thisis-images.scdn.co',
      'charts-images.scdn.co',
    ],
  },
  pwa: {
    dest: 'public',
    disable: false,
    scope: '/',
    runtimeCaching
  },
})
