import { getSession, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import useSpotify from '../hook/useSpotify'
import FeaturePlaylists from './FeaturePlaylists'
import Greeting from './Greeting'
import NewRelease from './NewRelease'
import RecentPlayed from './RecentPlayed'

function HomePage() {
  const spotifyApi = useSpotify()
  //   const { data: session } = useSession()
  const [recentTracks, setRecentTracks] = useState([])
  const [featurePlaylist, setFeaturePlaylist] = useState({})
  const [newRelease, setNewRelease] = useState({})
  const [savedShows, setSavedShows] = useState([])

  const getMyShows = () => {
    spotifyApi.getMySavedShows({ limit: 6 }).then(
      (data: any) => {
        console.log('getMySavedShows: ', data)
        setSavedShows(data?.body?.items ?? [])
      },
      (err) => {
        console.log('Something went wrong!', err)
      }
    )
  }
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
    getMyShows()
    getRecentTracks()
    getFeaturedPlaylists()
    getNewRelease()
  }, [])
  return (
    <div className="space-y-8 text-white">
      <Greeting />

      {/* new release album */}
      <NewRelease newRelease={newRelease} />

      {/* recent played */}
      <RecentPlayed recentTracks={recentTracks} />

      {/* Feature playlists */}
      <FeaturePlaylists featurePlaylist={featurePlaylist} />
    </div>
  )
}

export default HomePage
