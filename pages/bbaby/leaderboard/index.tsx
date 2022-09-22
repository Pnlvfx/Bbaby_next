import type { NextPage, NextPageContext } from "next"
import Head from "next/head"
import { useState } from "react"
import Leaderboard from "../../../components/leaderboard/Leaderboard"
import { getSession } from "../../../components/API/ssrAPI"

const LeaderboardPage:NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const title = "Today's Top Communities";
  const description = 'View Bbabystyle top communities. Filter to see view top communities in sports, gaming, news, television and more.';
  const imagePreview = `${hostname}/imagePreview.png`;
  const url = `${hostname}/bbaby/leaderboard`;
  const card = 'summary';
  const [active,setActive] = useState(0);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='robots' content='noindex' />
        <meta name="description" content={description} key={'description'} />
        <meta property='og:ttl' content='600' key={'ogttl'} />
        <meta property="og:site_name" content="bbabystyle" />
        <meta property="twitter:card" content={card} key="twcard" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <meta property="og:image" content={imagePreview} key="ogimage" />
        <meta property="og:url" content={url} key="ogurl" />
        <meta property="og:type" content="website" key="ogtype" />
        <link rel='canonical' href={url} key='canonical' />
      </Head>
      <Leaderboard />
    </>
  )
}

export default LeaderboardPage;

export const getServerSideProps = async (context: NextPageContext) => {
  let session = null;
  try {
    session = await getSession(context);
  } catch (err) {
    
  }

  return {
    props: {
      session,
    },
  }
}