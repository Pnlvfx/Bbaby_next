import Post from './Post'
import PostForm from '../submit/PostForm'
import TopCommunities from '../widget/TopCommunities'
import BestPost from './postutils/BestPost'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { isMobile } from 'react-device-detect'
import CommunitiesInfo from '../widget/CommunitiesInfo'
import dynamic from 'next/dynamic'
import LoaderPlaceholder from './LoaderPlaceholder'
import Donations from '../widget/Donations'

function Feed(props) {
  const PostModal = dynamic(() => import('./PostModal'))

  // GETTING COMMUNITY IF COMMUNITY PAGE
  const {community,author} = props
  //

  const [postOpen, setPostOpen] = useState(false)
  const router = useRouter()
  let postId = null

  if(router.query.postId) {
    postId = router.query.postId;
  }

  useEffect(() => {
    setPostOpen(true);
  }, [postId]);

  useEffect(() => {
    postId= null
  },[postOpen]);
  //

  //INFINITE SCROLLING
  const [posts,setPosts] = useState([])
  const [loadingPosts,setLoadingPosts] = useState(true)
  const [loadingCommunity,setLoadingCommunity] = useState(true)
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  const refreshCommunityPost = () => {
    axios({
      method: 'get',
      url: `${server}/posts?community=${community}&limit=10&skip=0`,
      withCredentials:true
    }).then(response => {
      setPosts(response.data)
      setLoadingPosts(false)
    })
  }

  //GET POST FROM COMMUNITYPAGE AND HOMEPAGE
  useEffect(() => {
    //setLoadingPosts(true)
    if (community) {
      refreshCommunityPost()
    } else if(author) {
      axios({
        method: 'get',
        url: `${server}/posts?author=${author}&limit=10&skip=0`,
        withCredentials:true
      }).then(response => {
        setPosts(response.data)
        setLoadingPosts(false)
      })
    } else {  //HOME
      axios({
        method: 'get',
        url: `${server}/posts?limit=10&skip=0`,
        withCredentials:true
      }).then(response => {
        setPosts(response.data)
        setLoadingPosts(false)
      })
    }
  },[])
  //

  const getMorePosts = async() => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    if (community) {
      const res = await axios.get(`${server}/posts?community=${community}&skip=${posts.length}&limit=10`)
      const newPosts = await res.data
      setPosts((posts) => [...posts, ...newPosts])
    } else if (author) {
      const res = await axios.get(`${server}/posts?author=${author}&skip=${posts.length}&limit=10`)
      const newPosts = await res.data
      setPosts((posts) => [...posts, ...newPosts])
    } else {
      const res = await axios.get(`${server}/posts?skip=${posts.length}&limit=10`)
      const newPosts = await res.data
      setPosts((posts) => [...posts, ...newPosts])
    }
  };
  //

  // GET ALL COMMUNITY INFO
  const [allCommunity,setAllCommunity] = useState([]);

  const refreshCommunities = () => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    axios.get(`${server}/best-communities?limit=5`,{withCredentials:true})
      .then(response => {
        setAllCommunity(response.data)
        setLoadingCommunity(false)
      });
  }

  useEffect(() => {
    if (community) return
    if (isMobile) return
    if (!loadingPosts) {
      refreshCommunities()
    }
    }, [loadingPosts]);
    //

  return (
    <>
    {postId && !isMobile && (
      <PostModal community={community} postId={postId} open={postOpen} onClickOut={() => {
        setPostOpen(false)
      }}/>
    )}
      <div className='flex pt-5 mx-0 lg:mx-10'>
        <div className='w-full lg:w-7/12 xl:w-5/12 2xl:w-[650px] self-center ml-auto mr-4 flex-none'>
            <div className='pb-[18px]'>
                {!author && ( //authorPage
                  <PostForm community={community ? community : posts?.community} allCommunity={allCommunity} />
                )}
            </div>
            <div className='pb-4'> 
              <BestPost />
            </div>
            {loadingPosts && (
              <>
              Loading posts..
                    {/* <LoaderPlaceholder extraStyles={{height:'400px'}} />
                    <LoaderPlaceholder extraStyles={{height:'400px'}} />
                    <LoaderPlaceholder extraStyles={{height:'400px'}} />
                    <LoaderPlaceholder extraStyles={{height:'400px'}} />
                    <LoaderPlaceholder extraStyles={{height:'400px'}} />
                    <LoaderPlaceholder extraStyles={{height:'400px'}} /> */}
              </>
            )}
            
            {!loadingPosts && (
              <>
              <InfiniteScroll 
              dataLength={posts.length}
              next={getMorePosts}
              hasMore={true}
              loader={<h4></h4>}
              endMessage={<p></p>}
            >
            {posts.map(post => (
                <Post key={post._id} {...post} isListing={true}/>
            ))}
            </InfiniteScroll>
            </>
            )}
        </div>
        {community && !isMobile && (
          <div className='hidden 2-xl:block xl:block lg:block md:hidden sm:hidden mr-auto'>
            <CommunitiesInfo community={community} />
          </div>
        )}
        {!community && !isMobile && (
          <div className='hidden 2-xl:flex xl:block lg:block md:hidden sm:hidden mr-auto'>
              <TopCommunities refreshCommunities={refreshCommunities} allCommunity={allCommunity} loadingCommunity={loadingCommunity}/>
              <Donations />
          </div>
        )}
    </div>
    </>
  )
}

export default Feed;