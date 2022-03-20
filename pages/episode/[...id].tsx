import Link from 'next/link';
import router, { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react'
import Header from '../../components/Header'
import Layout from '../../components/Layout';
import MediaOptions from '../../components/MediaOptions';
import MediaPlayButton from '../../components/MediaPlayButton';
import MediaSummary from '../../components/MediaSummary';
import useSpotify from '../../hook/useSpotify';

function Episode() {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const [episode, setEpisode]: any = useState();
  useEffect(() => {
    const { id } = router.query;
    if (id) {
      spotifyApi.getEpisode(id as string).then(res => {
        console.log("🚀 getEpisode: ", res.body)
        setEpisode(res.body);
      })
    }
    
  }, [router.query])
  return (
    <div>
      <Header />
      <MediaSummary
          description={null}
          followerCount={null}
          name={episode?.name}
          ownerImg={null}
          playlistImg={episode?.images?.[0]?.url}
          trackTotal={null}
          type='episode'
          owner={[{name: episode?.show?.name}]}
          totalSuffix={null}
      />
      <div className='flex items-center px-6 py-6 space-x-8'>
        <MediaPlayButton uri={episode?.show?.uri} />
        {/* <FollowButton  /> */}
        <MediaOptions uri={episode?.show?.uri}  />
      </div>

      <div className="px-6 space-y-10">
        <div className="space-y-6">
          <div className="text-heading text-3xl">Episode description</div>
          <div className='text-gray-300 font-semibold' dangerouslySetInnerHTML={{__html: episode?.html_description}}></div>
        </div>

        <Link href={`/show/${episode?.show?.id}`}>
          <div className='inline-flex uppercase font-semibold text-xs  px-6 py-3 cursor-pointer rounded-full bg-[#6d6d6d] transition transform duration-200 hover:bg-[#979797]'>See all episodes</div>
        </Link>
      </div>
    </div>
  )
}

export default Episode

Episode.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}