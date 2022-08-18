import type { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import { useState } from "react"
import Layout from "../../../components/main/Layout"
import Leaderboard from "../../../components/leaderboard/Leaderboard"

const LeaderboardPage:NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const title = "Today's Top Communities"
  const description = 'Bbabystyle - all best communities'
  const imagePreview = `${hostname}/imagePreview.png`
  const url = `${hostname}/bbaby/leaderboard`
  const card = 'summary'
  const [active,setActive] = useState(0)

  return (
    <div>
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
      <Layout>
        <Leaderboard />
      </Layout>
    </div>
  )
}

export default LeaderboardPage;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const headers = context?.req?.headers?.cookie ? { cookie: context.req.headers.cookie } : undefined;
  const url = `${server}/user`
  const response = await fetch(url, {
    method: 'get',
    headers
  })
  const session = await response.json();

  return {
    props: {
      session,
    },
  }
}