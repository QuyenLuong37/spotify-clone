export const client_id = process.env.SPOTIFY_CLIENT_ID;
export const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
export const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
export const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
export const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';
import SpotifyWebApi  from 'spotify-web-api-node';

// var spotifyApi = new SpotifyWebApi({
//   clientId: 'fcecfc72172e4cd267473117a17cbd4d',
//   clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
//   redirectUri: 'http://www.example.com/callback',
//   accessToken: '',
//   refreshToken: '',

// });

const getAccessToken = async (refresh_token: string) => {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    });
  
    return response.json();
  };

  export const getUsersPlaylists = async (refresh_token: string) => {
    const {access_token} = await getAccessToken(refresh_token);
    return fetch(PLAYLISTS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  };