import Router from 'next/router'
import { MouseEvent } from 'react'

export const openPost = (e: MouseEvent<HTMLDivElement | HTMLAnchorElement>, post: PostProps) => {
  e.preventDefault()
  e.stopPropagation()
  const mobile = window.innerWidth >= 820 ? false : true
  const url = mobile ? `/b/${post.community.toLowerCase()}/comments/${post._id}` : Router.pathname
  const query = mobile ? undefined : { postId: post._id, community: post.community, username: post.author }
  const as = mobile ? undefined : `/b/${post.community.toLowerCase()}/comments/${post._id}`
  Router.push(
    {
      pathname: url,
      query,
    },
    as,
    { scroll: false }
  )
}
