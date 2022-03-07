import type { NextPage, NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import HomePage from '../components/HomePage'
import Layout from '../components/Layout'
import { getMySavedEpisodes } from '../lib/spotify'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  return <>
    {session && <Layout >
       <HomePage />
     </Layout>}
  </>
}

export default Home
