import type { NextPage } from 'next'
import { getSession } from 'next-auth/react'
import HomePage from '../components/HomePage'
import Layout from '../components/Layout'

const Home: NextPage = ({data}: any) => {
  console.log('data: ', data)
  return (
     <Layout >
       <HomePage />
     </Layout>
  )
}

export default Home


export async function getStaticProps() {
  const sesstion = await getSession();
  console.log('sesstion: ', sesstion);
  return {
      props: {
          data: []
      }
  }
}

// export async function getServerSideProps() {
//   // const res = await fetch('http://localhost:3000/api/playlists');
//   // const playlists = await res.json();
//   return {
//     props: { playlists: []  },
//   }
// }