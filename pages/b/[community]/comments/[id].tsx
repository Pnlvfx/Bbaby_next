import type { NextPage, NextPageContext } from 'next';
import Router from 'next/router';
import { useContext, useEffect } from 'react';
import { getSession } from '../../../../components/API/ssrAPI';
import CommentPage from '../../../../components/comments/CommentPage';
import { CommunityContext, CommunityContextProps } from '../../../../components/community/CommunityContext';
import CEO from '../../../../components/main/CEO';
import { siteUrl } from '../../../../components/main/config';

interface PostIdPageProps {
  post: PostProps
  redirect: boolean
}

const IdPage: NextPage<PostIdPageProps> = ({ post, redirect }) => {
    const { getCommunity } = useContext(CommunityContext) as CommunityContextProps;

    useEffect(() => {
      if (!post) {
        Router.push('/404')
      } else {
        getCommunity(post.community);
      }
    }, [post]);

    useEffect(() => {
      if (!redirect) return;
      Router.push('/500')
    }, [redirect])

    if (!post) return null;
    
    const {title} = post
    const description = post?.body?.length >= 160 ? post.body : `${post.body} ${post.ups} votes, ${post.numComments} comments in the ${post.community} community. b/${post.community}`
    const url = `${siteUrl}/b/${post.community}/comments/${post._id}`
    const twitter_card = 'summary_large_image';
    const type = 'article'
    const og_image = post.mediaInfo?.isImage ?
     post.mediaInfo.image : 
     post.mediaInfo?.isVideo ? 
     post.mediaInfo.video.url.replace('mp4', 'jpg') : 
     '';
     const og_video = post.mediaInfo?.isVideo ? post.mediaInfo.video.url : undefined
     const og_wdith = post.mediaInfo?.dimension ? post.mediaInfo.dimension[1]?.toString() : undefined;
     const og_height = post.mediaInfo?.dimension ? post.mediaInfo.dimension[0]?.toString() : undefined;

  return (
    <>
      <CEO 
        title={title}
        url={url}
        description={description}
        twitter_card={twitter_card}
        type={type}
        image={og_image}
        video={og_video}
        width={og_wdith}
        height={og_height}
        index={true}
      />
      <CommentPage post={post}/>
    </>
  )
}

export default IdPage;

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const server = process.env.NEXT_PUBLIC_SERVER_URL;
    const {id} = context.query
    const headers = context?.req?.headers?.cookie ? {cookie: context.req.headers.cookie} : undefined;
    const postUrl = `${server}/posts/${id}`
    const session = await getSession(context);
    const res = await fetch(postUrl, {
      method: 'GET',
      headers
    });
    if (res.ok) {
      const post = await res.json();
      return {
        props: {
          session,
          post
        }
      }
    } else {
      return {
        props: {
          redirect: true
        }
      }
    }
  } catch (err) {
    const error = `Don't panic. Now we will fix the issue!`
    return {
      props: {
        error
      }
    }
  }
}







