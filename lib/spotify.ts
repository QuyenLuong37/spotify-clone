export const client_id = process.env.SPOTIFY_CLIENT_ID;
export const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
export const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
export const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
export const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';
export const MY_EPISODES_ENDPOINT = 'https://api.spotify.com/v1/me/episodes';


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

  export const getMySavedEpisodes = async (token: string) => {
    return fetch(MY_EPISODES_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const getUsersPlaylists = async (refresh_token: string) => {
    const {access_token} = await getAccessToken(refresh_token);
    return fetch(PLAYLISTS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  };