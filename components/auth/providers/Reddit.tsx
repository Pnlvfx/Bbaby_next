import axios from "axios"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Reddit = (userInfo:UserProps) => {
    const redditAccount = userInfo.hasExternalAccount ? userInfo.externalAccounts?.find((provider: any) => provider.provider === 'reddit') : undefined
    const CLIENT_ID = process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID
    const uri = process.env.NEXT_PUBLIC_HOSTNAME + '/settings'    //reddit
    const router = useRouter()

    const redditLogin = () => {
        window.open(`https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=bbabystyle&redirect_uri=${uri}&duration=permanent&scope=identity,submit,save,vote`,'_self')
    }

    useEffect(() => {
        if (!router.isReady) return
        if (!router.query.code && !router.query.state) return
        const server = process.env.NEXT_PUBLIC_SERVER_URL
        axios.get(`${server}/reddit_login?code=${router.query.code}`, {withCredentials:true}).then(response => {
            
        })
    },[router.isReady, router.query.code, router.query.state])

    return (
        <div className="mt-7">
            {!redditAccount && (
                <>
                <div>
                    <p>Connect to Reddit</p>
                    <h2 className="text-[11px] text-reddit_text-darker font-normal pt-[2px]">Connect a Reddit account to enable the choiche to post your content on Reddit. We will never share to Reddit without your permission</h2>
                </div>
                <div className="self-center mt-4">
                    <button onClick={() => {
                        redditLogin()
                    }} className='rounded-full px-4 py-[7px] text-sm font-bold bg-reddit_orange flex ml-auto' >
                    Connect to Reddit
                    </button>
                </div>
                </>
            )}
            {redditAccount && (
                <>
                <div className="flex">
                    <div>
                        <p>Connected to Reddit</p>
                        <h2 className="text-[11px] text-reddit_text-darker font-normal pt-[2px]">You can now choose to see your reddit feed from bbabystyle user-page</h2>
                    </div>
                    <div className="self-center ml-auto">
                        <div className="rounded-full px-4 py-[7px] text-xs ml-auto">
                            <p className="text-reddit_text-darker">@{redditAccount?.username}</p>
                            <button id="logout" title="logout" onClick={() => {
                                
                            }} >
                                <p className="self-center text-center text-reddit_orange mt-2">(disconnect)</p>
                            </button>
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
        )
    }

export default Reddit;