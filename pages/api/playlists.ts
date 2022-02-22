import {getUsersPlaylists} from '../../lib/spotify';
import {getSession} from 'next-auth/react';

const handler = async (req: any, res: any) => {
  const {
    token: {accessToken},
  }: any = await getSession({req});
  console.log('accessToken: ', accessToken);
  const response = await getUsersPlaylists(accessToken);
  const data = await response.json();
  // console.log('data: ', data);
  return res.status(200).json({items: data.items});
};

export default handler;