import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Script from 'next/script'
import React, { useState, useEffect } from 'react'
import useSpotify from '../hook/useSpotify'

const track = {
  name: '',
  album: {
    images: [{ url: '' }],
  },
  artists: [{ name: '' }],
}

function WebPlayback({ accessToken }) {
  const { data: session, status }: any = useSession()
  const [is_paused, setPaused] = useState(false)
  const [is_active, setActive] = useState(false)
  const [player, setPlayer]: any = useState(null)
  const [current_track, setTrack] = useState(track)
  const spotifyApi = useSpotify()
  useEffect(() => {
    spotifyApi.getMyCurrentPlaybackState().then(
      (data) => {
        console.log('getMyCurrentPlaybackState: ', data)
      },
      (err) => {
        console.log('Something went wrong!', err)
      }
    )
    spotifyApi.getMyDevices().then(
      (data) => {
        let availableDevices = data.body.devices
        console.log('availableDevices: ', availableDevices)
      },
      (err) => {
        console.log('Something went wrong!', err)
      }
    )

    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true

    document.body.appendChild(script)
    ;(window as any).onSpotifyWebPlaybackSDKReady = async () => {
      const player = new (window as any).Spotify.Player({
        name: 'May cua Quyen',
        getOAuthToken: (cb) => {
          cb(accessToken)
        },
        volume: 0.5,
      })

      const myRecentlyPlayedTracks = await spotifyApi
        .getMyRecentlyPlayedTracks({
          limit: 10,
        })
        .then(
          (data) => {
            // Output items
            console.log('Your 2 most recently played tracks are:')
            return data.body.items.map((item) => item.track.uri)
          },
          (err) => {
            console.log('Something went wrong!', err)
            return []
          }
        )

      console.log('myRecentlyPlayedTracks: ', myRecentlyPlayedTracks)

      setPlayer(player)

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
        spotifyApi.transferMyPlayback([device_id]).then(
          function () {
            console.log('Transfering playback to ' + device_id)
          },
          function (err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err)
          }
        )
      })

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })

      player.addListener('player_state_changed', (state) => {
        if (!state) {
          return
        }
        console.log('player state change: ', state)
        setTrack(state.track_window.current_track)
        setPaused(state.paused)

        player.getCurrentState().then((a) => {
          !state ? setActive(false) : setActive(true)
        })
      })

      player.connect().then((success) => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!')
        }
      })
    }
  }, [])

  return (
    <div>
      {!is_active && (
        <>
          <div className="container">
            <div className="main-wrapper">
              <b>
                Instance not active. Transfer your playback using your Spotify
                app
              </b>
            </div>
          </div>
        </>
      )}

      {is_active && (
        <>
          <button
            onClick={() => {
              player.seek(60 * 1000)
            }}
          >
            seek
          </button>
          <div className="container">
            <div className="main-wrapper">
              <img
                src={current_track.album.images[0].url}
                className="now-playing__cover h-60"
                alt=""
              />

              <div className="now-playing__side">
                <div className="now-playing__name">{current_track.name}</div>
                <div className="now-playing__artist">
                  {current_track.artists[0].name}
                </div>

                <button
                  className="btn-spotify"
                  onClick={() => {
                    player.previousTrack()
                  }}
                >
                  &lt;&lt;
                </button>

                <button
                  className="btn-spotify"
                  onClick={() => {
                    player.togglePlay()
                  }}
                >
                  {is_paused ? 'PLAY' : 'PAUSE'}
                </button>

                <button
                  className="btn-spotify"
                  onClick={() => {
                    player.nextTrack()
                  }}
                >
                  &gt;&gt;
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default WebPlayback
