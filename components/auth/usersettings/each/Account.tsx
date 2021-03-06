import axios from "axios";
import { useEffect, useState } from "react";
import { buttonClass } from "../../../utils/Button";
import {RiArrowDropDownFill} from 'react-icons/ri'
import Twitter from "../../providers/Twitter";
import Reddit from "../../providers/Reddit";

function Account() {

  const [userInfo,setUserInfo] = useState<UserProps>({})
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    axios.get(`${server}/user/about`, {withCredentials:true})
      .then(response => {
        setUserInfo(response.data)
        setLoading(false)
      })
  }, [])
  
  const {email,country} = userInfo

  return (
      <>
      {loading && (
        <div>loading...</div>
      )}
      {!loading && (
        <div className="px-8 font-semibold">
          <p className='py-4 text-[19px]'>Account settings</p>
          <h2 className="text-reddit_text-darker text-[11px] mb-2">ACCOUNT PREFERENCES</h2>
          <hr className='p-2 border-reddit_border'/>
          <div id="change_email_address" className="mt-5 flex">
            <div className="">
              <p className="">Email address</p>
              <p className="text-[12px] text-reddit_text-darker font-normal pt-[2px]">{email}</p>
            </div>
            <div className="ml-auto self-center">
              <button className={`py-1 px-[18px] ${buttonClass(true)}`}>Change</button>
            </div>
        </div>
        <div id="change_password" className="mt-7 flex">
          <div className="">
            <p className="">Change password</p>
            <p className="text-[12px] text-reddit_text-darker font-normal pt-[2px]">Password must be at least 8 characters long</p>
          </div>
          <div className="self-center ml-auto">
            <button className={`py-1 px-[18px] ${buttonClass(true)}`}>Change</button>
          </div>
        </div>
        <div id="gender" className="mt-7 flex">
          <div className="">
            <p className="">Gender</p>
            <p className="text-[12px] text-reddit_text-darker font-normal pt-[2px]">Bbaby will never share this information and only uses it to improve what content you see.</p>
          </div>
          <div className="self-center ml-auto flex">
            <div className='py-2 text-xs'>SELECT</div>
            <RiArrowDropDownFill className="self-center w-7 h-7 text-reddit_text-darker" />
          </div>
        </div>
        <div id="country" className="mt-7">
          <div className="">
            <p className="">Country</p>
            <p className="text-[12px] text-reddit_text-darker font-normal pt-[2px]">This is your primary location.</p>
          </div>
          <div className="self-center ml-auto">
            <div className='py-5 text-sm px-[28px]'>{country}</div>
          </div>
        </div>
        <div id="separator">
          <p className="text-reddit_text-darker text-[11px] mb-2">CONNECTED ACCOUNTS</p>
          <hr className='p-2 border-reddit_border'/>
        </div>
        <div id="social_connection">
          <Twitter {...userInfo}/>
          <Reddit {...userInfo} />
        </div>
        </div>
      )}
      </>
  )
}

export default Account;