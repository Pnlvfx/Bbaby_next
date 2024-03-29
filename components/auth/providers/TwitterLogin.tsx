import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { postRequestHeaders } from '../../main/config'
import { TwitterLogo } from '../../utils/SVG/SVG'

const TwitterLogin = (userInfo: UserProps) => {
  const router = useRouter()
  const twitterAccount = userInfo.hasExternalAccount ? userInfo?.externalAccounts?.find((provider) => provider.provider === 'twitter') : undefined

  const twitterGetToken = async () => {
    try {
      const server = process.env.NEXT_PUBLIC_SERVER_URL
      const url = `${server}/twitter/oauth/request_token`
      const res = await fetch(url, {
        method: 'POST',
        headers: postRequestHeaders,
        credentials: 'include',
      })
      const data = await res.json()
      if (res.ok) {
        router.push(`https://api.twitter.com/oauth/authenticate?oauth_token=${data.oauth_token}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const twitterLogout = () => {
    ;(async () => {
      try {
        const server = process.env.NEXT_PUBLIC_SERVER_URL
        const url = `${server}/twitter/logout`
        const res = await fetch(url, {
          method: 'POST',
          headers: postRequestHeaders,
          credentials: 'include',
        })
        if (res.ok) {
          router.reload()
        }
      } catch (err) {
        console.error(err)
      }
    })()
  }

  useEffect(() => {
    ;(async () => {
      const { oauth_token, oauth_verifier } = router.query
      if (oauth_token && oauth_verifier) {
        const server = process.env.NEXT_PUBLIC_SERVER_URL
        const url = `${server}/twitter/oauth/access_token`
        const body = JSON.stringify({ oauth_token, oauth_verifier })
        try {
          await fetch(url, {
            method: 'POST',
            headers: postRequestHeaders,
            credentials: 'include',
            body,
          })
          const url2 = `${server}/twitter/user/info`
          const res2 = await fetch(url2, {
            method: 'GET',
            credentials: 'include',
          })
          if (res2.ok) {
            window.location.href = '/settings'
          } else {
          }
        } catch (err) {
          console.error(err)
        }
      }
    })()
  }, [router.query])

  return (
    <div id="twitter" className="mt-7">
      {!twitterAccount && (
        <>
          <p className="">Connect to Twitter</p>
          <p className="pt-[2px] text-[11px] font-normal text-reddit_text-darker">
            Connect a Twitter account to enable the choice to tweet your new posts and display a link on your profile. We will never post to Twitter
            without your permission.
          </p>
          <button
            onClick={() => {
              twitterGetToken()
            }}
            className="ml-auto mt-4 flex rounded-full bg-[#1D96E1] px-4 py-[7px] text-sm font-bold"
          >
            <TwitterLogo />
            <p className="self-center text-reddit_dark">Connect to Twitter</p>
          </button>
        </>
      )}
      {twitterAccount && (
        <>
          <div className="flex">
            <div className="">
              <p className="">Connected to Twitter</p>
              <h2 className="pt-[2px] text-[11px] font-normal text-reddit_text-darker">
                You can now choose to share your posts to Twitter from the new post composer.
              </h2>
            </div>
            <div className="ml-auto">
              <div className="ml-auto rounded-full px-4 py-[7px] text-xs">
                <p className="text-reddit_text-darker">@{twitterAccount?.username}</p>
                <button
                  id="logout"
                  title="logout"
                  onClick={() => {
                    twitterLogout()
                  }}
                >
                  <h2 className="mt-2 self-center text-[#47AEF6]">(disconnect)</h2>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TwitterLogin
