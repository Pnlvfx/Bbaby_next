import Youtube from '../../components/governance/youtube/Youtube'
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/main/Layout";
import GovernanceCtrl from "../../components/governance/GovernanceCtrl";
import Head from 'next/head';
import GovernanceMainMenù from '../../components/governance/GovernanceMainMenù';
import { YoutubeContextProvider } from '../../components/governance/youtube/YoutubeContext';

const Governance: NextPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  return (
    <div className="w-full h-[1000px]">
      <Head>
        <title>Bbabystyle - authority page - youtube</title>
        <meta name='robots' content='noindex' />
        <link rel='canonical' href={`${hostname}/governance/youtube`} key='canonical' />
      </Head>
      <Layout>
        <GovernanceCtrl>
          <GovernanceMainMenù />
          <YoutubeContextProvider>
            <Youtube /> 
          </YoutubeContextProvider>
        </GovernanceCtrl>
      </Layout>
    </div>
  )
}

export default Governance;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const production = process.env.NODE_ENV === 'production' ? true : false
  const server = production ? process.env.NEXT_PUBLIC_SERVER_URL : `http://${context.req.headers.host?.replace('3000', '4000')}`;
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