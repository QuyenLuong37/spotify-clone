import type { NextPage } from 'next'
import Center from '../components/Center'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  // console.log('env: ', process.env.NEXTAUTH_URL)
  return (
    <div className='bg-black overflow-hidden h-screen'>
      <main className='flex  h-screen'>
        {/* Sidebar */}
        <Sidebar />
        {/* Center */}
        <div className='flex-grow'>
        <Center/>
        </div>
      </main>

      <div>
        {/* Player */}
      </div>
    </div>
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