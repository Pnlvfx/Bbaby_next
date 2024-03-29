import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { getSession } from '../../../components/API/ssrAPI'
import GovernanceCtrl from '../../../components/governance/GovernanceCtrl'
import GovernanceMainMenù from '../../../components/governance/GovernanceMainMenù'
import RedditFeed from '../../../components/governance/reddit/RedditFeed'
import { siteUrl } from '../../../components/main/config'
import BestPost from '../../../components/post/postutils/BestPost'
import PostForm from '../../../components/submit/submitutils/PostForm'

const RedditPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bbabystyle - authority page - Reddit</title>
        <meta name="robots" content="noindex" />
        <link
          rel="canonical"
          href={`${siteUrl}/governance/reddit`}
          key="canonical"
        />
      </Head>
      <GovernanceCtrl>
        <GovernanceMainMenù />
        <RedditFeed postForm={<PostForm />} bestPost={<BestPost />} />
      </GovernanceCtrl>
    </>
  )
}

export default RedditPage

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context)
    return {
      props: {
        session,
      },
    }
  } catch (err) {
    const error = `Don't panic. Now we fix the issue!`
    return {
      props: {
        error,
      },
    }
  }
}
