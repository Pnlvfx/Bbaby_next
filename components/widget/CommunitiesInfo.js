import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { EditTextarea } from 'react-edit-text';
import Button from '../utils/Button'
import {MdOutlineAdminPanelSettings, MdOutlineModeEditOutline} from 'react-icons/md'
import ClickOutHandler from "react-clickout-handler";
import moment from 'moment';
import Link from "next/link";
import AuthModalContext from "../auth/AuthModalContext";
import UserContext from "../auth/UserContext";

function CommunitiesInfo() {
    const provider = useContext(UserContext)
    const {session} = provider

    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const [communityInfo,setCommunityInfo] = useState({})
    const router = useRouter()
    const [description,setDescription] = useState('')
    const [commit,setCommit] = useState(false)

    const {query} = router
    const {community} = query
    const {user} = session ? session : {user: {username: ''}}
    const authModal = useContext(AuthModalContext)


    //setDescription
    useEffect(() => {
      setDescription(communityInfo.description)
    }, [communityInfo])



    useEffect(() => {
        if(commit) {
            const data = {description, name:communityInfo.name}
            axios.post(server+'/communities/edit/description',data,{withCredentials:true}).then(response => {
                setCommit(false)
            })
        }
    },[commit])


    //get Community info
    useEffect(() => {
        axios.get(server+'/communities/'+community)
        .then(response => {
            setCommunityInfo(response.data);
        })
      },[community])
    
    //console.log(commit)
    //console.log(communityInfo)
    return (
      <div className='bg-reddit_dark-brighter shadow-lg w-[310px] h-96 rounded-md border border-reddit_border'>
          <div className='p-2'>
              <div className="flex text-reddit_text-darker">
                <div>
                    <h1 className=" p-1 font-bold text-[15px]">About community</h1>
                </div>
                <Link href={`/b/${communityInfo.name}/about/modqueue`} className="">
                    <a className="ml-auto">
                        <div className="flex mt-1">
                        <MdOutlineAdminPanelSettings className="w-6 h-6" />
                        <span className="text-[12px] p-1 font-bold">MOD TOOLS</span>
                        </div>
                    </a>
                </Link>
              </div>
              <div className="flex pt-3">
                    <div className=''>
                        <img src={communityInfo.communityAvatar} alt='' className="w-8 h-8 rounded-full flex-none"/>
                    </div>
                    <h3 className="h-12 pl-2 mt-[4px]">
                        b/{communityInfo.name}
                    </h3>
              </div>
              {user.username === communityInfo.communityAuthor && (
              <ClickOutHandler onClickOut={() => {
                  setCommit(true)
              }}>
                 
                     <div className="flex hover:border border-reddit_text">
                     <div className="overflow-hidden">
                     <EditTextarea className='bg-reddit_dark-brighter break-words leading-6 overflow-hidden resize-none outline-none' value={description} onChange={setDescription} />               
                     </div>
                     <div className="pt-4 text-reddit_text-darker">
                     <MdOutlineModeEditOutline className="w-6 h-6"/>
                     </div>
                   </div>
              </ClickOutHandler>
              )} 
              {user.username !== communityInfo.communityAuthor && (
                  <div className="flex">
                  <div className="overflow-hidden mb-2">
                  <span className='bg-reddit_dark-brighter break-words leading-6 overflow-hidden resize-none outline-none'>{description}</span>               
                  </div>
                </div>
              )}

              <div>
                  <hr className="border-reddit_border"></hr>
                  <div className="py-3 text-sm">
                      Created {moment(communityInfo.createdAt).format('MMM DD, YYYY')}
                  </div>
                  <hr className="border-reddit_border"/>
              </div>
              <div className="">
                  {!user && (
                      <Button onClick={() => {authModal.setShow('login')}} className='w-full py-1 mt-3 mb-4'>Create a Post</Button>
                  )}
                  {user && (
                      <Button onClick={e => {
                        e.preventDefault()  
                        router.push({
                          pathname:'/submit',
                          query: {with_community: community}
                        },'/submit')
                        }} className='w-full py-1 mt-3 mb-4'>Create a Post</Button>
                  )}
              </div>
              <hr className="border-reddit_border"/>
          </div>
      </div>
    )
  }
  
  export default CommunitiesInfo;