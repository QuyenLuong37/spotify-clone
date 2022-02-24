import {getUsersPlaylists} from '../../lib/spotify';
import {getSession} from 'next-auth/react';

const handler = async (req: any, res: any) => {
  const {
    refreshToken,
  }: any = await getSession({req});
  const response = await getUsersPlaylists(refreshToken);
  const data = await response.json();
  // console.log('data: ', data);
  return res.status(200).json({items: data.items});
};

export default handler;