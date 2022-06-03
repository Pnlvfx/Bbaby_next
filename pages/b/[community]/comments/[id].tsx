import axios from 'axios';
import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router';
import CommentPage from '../../../../components/comments/CommentPage'
import Layout from '../../../../components/Layout';

const id: NextPage = (props) => {
    const hostname = process.env.NEXT_PUBLIC_HOSTNAME
    const {post}: any = props

    console.log(useRouter().query)

  return (
    <div>
       <Head>
        <title>{post.title}</title>
        <meta property="og:title" content={post.title} key='ogtitle' />
        <meta name="description" content={post.body}  />
        <meta property="og:description" content={post.body} key='ogdesc'/>
        <meta property="og:image" content={post.image} key='ogimage' />
        <meta property="og:url" content={hostname + '/b/' + post.community + '/comments/' + post._id} key='ogurl' />
        <meta property='og:type' content='website' key='ogtype' />
        <meta name="twitter:card" content="summary_large_image" key='twcard'/>
        <meta name="twitter:image:alt" content="" />
        <link rel='canonical' href={hostname + '/b/' + post.community + '/comments/' + post._id} key='canonical' />
      </Head>
      <Layout>
        <CommentPage post={post}/>
      </Layout>
    </div>
  )
}

export default id

export async function getServerSideProps(context: NextPageContext) {
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const {query} = context
  const {id} = query
  const res = await axios.get(server+`/posts/${id}`);

  const post = await res.data

  //login
  const response = await axios({
    method: "get",
    url: `${server}/user`,
    headers: context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined,
    withCredentials:true})
    const session = await response.data

  return {
    props: {
      session: session,
      post: post
    }
  }
}






