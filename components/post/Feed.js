import Post from './Post'
import PostForm from '../submit/PostForm'
import CommunitiesList from '../widget/TopCommunities'
import BestPost from './postutils/BestPost'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CommentModal from '../comments/CommentModal'
import { isMobile } from 'react-device-detect'

//PostsListings from home and best page

function Feed(props) {
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  const [postOpen, setPostOpen] = useState(false)

  let router = useRouter()
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

  //INFINITE SCROLLING
  const [posts,setPosts] = useState(props.posts)

  const getMorePosts = async() => {
    const res = await axios.get(`${server}/posts?skip=${posts.length}&limit=10`)
    
    const newPosts = await res.data
    setPosts((posts) => [...posts, ...newPosts])
  };
  //

  // GET ALL COMMUNITY INFO
  const [allCommunity,setAllCommunity] = useState([]);

  useEffect(() => {
    axios.get(server+'/communities?limit=5', {withCredentials:true})
        .then(response => setAllCommunity(response.data));
    }, []);
    //


  

  return (
    <>
    {postId && !isMobile && (
      <CommentModal postId={postId} open={postOpen} onClickOut={() => {
        setPostOpen(false)
      }} />
    )}
    <div className='flex pt-5 mx-0 lg:mx-10'>
        <div className='w-full lg:w-7/12 xl:w-5/12 2xl:w-[650px] self-center ml-auto mr-6 flex-none'>
          <div>
          </div>
           <div className='pb-3'>
            <PostForm community={props.community} allCommunity={allCommunity} />
          </div>
            <div className='pb-4'> 
                <BestPost />
              </div>
            <div className=''>
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
            </div> 
        </div>
          <div className='hidden 2-xl:block xl:block lg:block md:hidden sm:hidden mr-auto'>
              <CommunitiesList allCommunity={allCommunity}/>
          </div>
      </div>
    </>
  )
}

export default Feed;