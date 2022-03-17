import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import FeaturePlaylists from '../components/FeaturePlaylists'
import Greeting from '../components/Greeting'
import Header from '../components/Header'
import Layout from '../components/Layout'
import NewRelease from '../components/NewRelease'
import RecentPlayed from '../components/RecentPlayed'
import WebPlayback from '../components/WebPlayback'
import useSpotify from '../hook/useSpotify'
import { getMySavedEpisodes } from '../lib/spotify'

const Home: NextPage = () => {
  const spotifyApi = useSpotify()
    const { data: session }: any = useSession()
  const [recentTracks, setRecentTracks] = useState([])
  const [featurePlaylist, setFeaturePlaylist] = useState({})
  const [newRelease, setNewRelease] = useState({})
  const [savedShows, setSavedShows] = useState([])
  // const [categories, setCategories] = useState([])

  // const getCategories = () => {

  // }

  // const getMyShows = () => {
  //   spotifyApi.getMySavedShows({ limit: 6 }).then(
  //     (data: any) => {
  //       console.log('getMySavedShows: ', data)
  //       setSavedShows(data?.body?.items ?? [])
  //     },
  //     (err) => {
  //       console.log('Something went wrong!', err)
  //     }
  //   )
  // }
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
          console.log('Something went wrong!', err)
        }
      )
  }
  const getFeaturedPlaylists = () => {
    spotifyApi.getFeaturedPlaylists({ country: 'VN', limit: 10 }).then(
      (data: any) => {
        setFeaturePlaylist(data?.body ?? {})
      },
      (err) => {
        console.log('Something went wrong!', err)
      }
    )
  }
  const getNewRelease = () => {
    spotifyApi.getNewReleases({ limit: 10 }).then(
      (data: any) => {
        console.log('getNewRelease: ', data?.body?.albums?.items)
        setNewRelease(data?.body?.albums?.items ?? [])
      },
      (err) => {
        console.log('Something went wrong!', err)
      }
    )
  }
  useEffect(() => {
    if (session) {
      // getMyShows()
      getRecentTracks()
      getFeaturedPlaylists()
      getNewRelease()
    }
  }, [session])
  return <>
      <div className="space-y-8 text-white p-6">
        
        <Header />
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

export default Home
