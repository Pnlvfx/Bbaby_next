import Youtube from '../../components/governance/youtube/Youtube'
import axios from "axios";
import { NextPage, NextPageContext } from "next";
import Layout from "../../components/main/Layout";
import GovernanceCtrl from "../../components/governance/GovernanceCtrl";
import Head from 'next/head';
import GovernanceMainMen├╣ from '../../components/governance/GovernanceMainMen├╣';
import { YoutubeContextProvider } from '../../components/governance/youtube/YoutubeContext';

const Governance: NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  return (
    <div className="w-full h-[1000px]">
      <Head>
        <title>Bbabystyle - authority page - youtube</title>
        <link rel="icon" href="/favicon.ico"/>
        <link rel='canonical' href={`${hostname}/governance/youtube`} key='canonical' />
      </Head>
      <Layout>
        <GovernanceCtrl>
          <GovernanceMainMen├╣ />
          <YoutubeContextProvider>
            <Youtube /> 
          </YoutubeContextProvider>
        </GovernanceCtrl>
      </Layout>
    </div>
  )
}

export default Governance;

export async function getServerSideProps(context: NextPageContext) {
  
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