import type { NextPage } from 'next'
import HomePage from '../components/HomePage'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  // console.log('env: ', process.env.NEXTAUTH_URL)
  return (
     <Layout >
       <HomePage />
     </Layout>
  )
}

export default Home


// export async function getServerSideProps() {
//   // const res = await fetch('http://localhost:3000/api/playlists');
//   // const playlists = await res.json();
//   return {
//     props: { playlists: []  },
//   }
// }