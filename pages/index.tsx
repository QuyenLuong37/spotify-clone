import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useState, useEffect, ReactElement } from 'react'
import FeaturePlaylists from '../components/FeaturePlaylists'
import Greeting from '../components/Greeting'
import Header from '../components/Header'
import Layout from '../components/Layout'
import NewRelease from '../components/NewRelease'
import RecentPlayed from '../components/RecentPlayed'
import useSpotify from '../hook/useSpotify'

export default function Home()  {
  const spotifyApi = useSpotify()
    const { data: session }: any = useSession()
  const [recentTracks, setRecentTracks] = useState([])
  const [featurePlaylist, setFeaturePlaylist] = useState({})
  const [newRelease, setNewRelease] = useState({})
  // Get tracks in the signed in user's Your Music library
  const getRecentTracks = () => {
    spotifyApi
      .getMyRecentlyPlayedTracks({
        limit: 10,
      })
      .then(
        (data: any) => {
          setRecentTracks(data?.body?.items ?? [])
        },
        (err) => {
          
        }
      )
  }
  const getFeaturedPlaylists = () => {
    spotifyApi.getFeaturedPlaylists({ country: 'VN', limit: 10 }).then(
      (data: any) => {
        setFeaturePlaylist(data?.body ?? {})
      },
      (err) => {
        
      }
    )
  }
  const getNewRelease = () => {
    spotifyApi.getNewReleases({ limit: 10, country: 'VN' }).then(
      (data: any) => {
        setNewRelease(data?.body?.albums?.items ?? [])
      },
      (err) => {
        
      }
    )
  }
  useEffect(() => {
    getRecentTracks()
    getFeaturedPlaylists()
    getNewRelease()
  }, [])
  return <>
      <Header />
      <div className="space-y-10 p-6">
        
        <Greeting />

        {/* new release album */}
        <NewRelease newRelease={newRelease} />

        {/* recent played */}
        <RecentPlayed recentTracks={recentTracks} />

        {/* Feature playlists */}
        <FeaturePlaylists featurePlaylist={featurePlaylist} />
      </div>
  </>
}

// export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}