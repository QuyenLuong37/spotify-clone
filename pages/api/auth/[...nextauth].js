import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
export const client_id = process.env.SPOTIFY_CLIENT_ID
export const client_secret = process.env.SPOTIFY_CLIENT_SECRET
export const basic = Buffer.from(`${client_id}:${client_secret}`).toString(
    'base64'
)
async function refreshAccessToken(token) {
    try {
        const url = 'https://accounts.spotify.com/api/token'

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: token.refreshToken,
            }),
        })

        const refreshedTokens = await response.json()
        if (!response.ok) {
            throw refreshedTokens
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token || token.refreshToken, // Fall back to old refresh token
        }
    } catch (error) {
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        }
    }
}

export default NextAuth({
    providers: [
        SpotifyProvider({
            authorization: 'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,streaming,user-read-private,user-read-currently-playing,user-read-recently-played,user-read-playback-state,playlist-modify-public,playlist-read-collaborative,playlist-modify-private,user-library-read,user-follow-read,user-follow-modify,user-library-modify&show_dialog=true',
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: '/login',
    },
    secret: 'lRh3njL7SnUfVo9OCenr29BP/dnZC8KGQatcIjM6Hxo=',
    callbacks: {
        // async redirect({ url, baseUrl }) {
        //     console.log("🚀baseUrl", baseUrl)
        //     console.log("🚀url", url)
        //     return baseUrl
        // },
        async jwt({ token, user, account }) {
            // Initial sign in
            
            if (account && user) {
                return {
                    accessToken: account.access_token,
                    accessTokenExpires: account.expires_at * 1000,
                    refreshToken: account.refresh_token,
                    user,
                }
            }
            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                return token
            }
            // // Access token has expired, try to update it
            return refreshAccessToken(token)
        },
        async session({ session, token }) {
            session.user = token.user
            session.accessToken = token.accessToken
            session.refreshToken = token.refreshToken
            session.error = token.error
            return session
        },
    },
})