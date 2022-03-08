import type { NextPage, NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import HomePage from '../components/HomePage'
import Layout from '../components/Layout'
import { getMySavedEpisodes } from '../lib/spotify'

const Home: NextPage = () => {
  return <>
    <Layout >
       <HomePage />
     </Layout>
  </>
}

export default Home


// export const getServerSideProps = async (context) => {
//   const sesstion: any = await getSession();
//   const res = await getMySavedEpisodes(sesstion.accessToken);
//   const data = await res.json();
//   console.log('data: ', data);
//   return {
//     props: {}
//   }
// }

