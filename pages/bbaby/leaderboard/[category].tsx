import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { getSession } from '../../../components/API/ssrAPI';
import Leaderboard from '../../../components/leaderboard/Leaderboard';

interface Props {
  category: string
}

const CategoryPage:NextPage<Props> = ({ category }) => {
    const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
    const title = "Today's Top Communities";
    const description = 'View Bbabystyle top communities. Filter to see view top communities in sports, gaming, news, television and more.';
    const url = `${hostname}/bbaby/leaderboard/${category}`;
    const imagePreview = `${hostname}/imagePreview.png`;
    const card = 'summary';
    
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

export default CategoryPage;

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context);
    const {category} = context.query;
    return {
      props: {
        session,
        category
      },
    }
  } catch (err) {
    const error = `Don't panic. Now we fix the issue!`
    return {
      props: {
        error
      }
    }
  }
}