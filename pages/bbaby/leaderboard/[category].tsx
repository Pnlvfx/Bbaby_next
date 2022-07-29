import { GetServerSideProps } from 'next';
import axios from 'axios';
import Head from 'next/head';
import Layout from '../../../components/main/Layout';
import Leaderboard from '../../../components/leaderboard/Leaderboard';
import { useState } from 'react';

const CategoryPage = () => {
    const hostname = process.env.NEXT_PUBLIC_HOSTNAME
    const [active,setActive] = useState(0)
  return (
    <div>
        <Head>
        <title>Today&apos;s Top Communities </title>
        <link rel="icon" href="/favicon.ico"/>
        <meta property="og:title" content="Today's Top Communities" key='ogtitle' />
        <meta name="description" content="Bbabystyle - all best communities" />
        <meta property="og:description" content="Bbabystyle - all best communities" key='ogdesc' />
        <meta property="og:url" content={`${hostname}/bbaby/leaderboard`} key='ogurl' />
        <meta property='og:type' content='website' key='ogtype' />
        <meta name="twitter:card" content="summary" key='twcard'/>
        <meta name="twitter:image:alt" content="This image contain the logo of this website" />
        <link rel='canonical' href={`${hostname}/bbaby/leaderboard`} key='canonical' />
        </Head>
        <Layout>
        <Leaderboard active={active} setActive={setActive} />
      </Layout>
    </div>
  )
}

export default CategoryPage;

export const getServerSideProps: GetServerSideProps = async(context) => {
  
    const server = process.env.NEXT_PUBLIC_SERVER_URL
  
    const response =  await axios({
      method: "get",
      url: `${server}/user`,
      headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
      })
      const session = response.data
  
    return {
      props: {
        session: session,
      }
    }
  }