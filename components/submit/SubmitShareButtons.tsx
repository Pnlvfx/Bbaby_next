import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { catchErrorWithMessage } from '../API/common'
import userapis from '../API/userapis'
import { useSession } from '../auth/UserContext'
import { useMessage } from '../main/TimeMsgContext'
import CheckBox from '../utils/buttons/CheckBox'
import { useSubmitProvider } from './SubmitContext'

const SubmitShareButtons = () => {
  const { session } = useSession()
  const [canPostOnTwitter, setCanPostOnTwitter] = useState(false)
  const { sharePostToTG, setSharePostToTG, sharePostToTwitter, setSharePostToTwitter } = useSubmitProvider()
  const message = useMessage()

  useEffect(() => {
    const authorize = async () => {
      try {
        const userInfo = await userapis.getUserInfo()
        if (userInfo?.externalAccounts?.find((provider) => provider.provider === 'twitter')) {
          setCanPostOnTwitter(true)
          if (session?.user?.role === 1 && process.env.NODE_ENV === 'production') {
            setSharePostToTwitter(true)
          }
        }
      } catch (err) {
        catchErrorWithMessage(err, message)
      }
    }
    authorize()
  }, [])
  return (
    <div
      className="relative flex h-24 rounded-b-md border-t border-solid border-reddit_border bg-reddit_dark-brightest py-2 px-4"
      style={{ flexFlow: 'column' }}
    >
      <div className="mt-2 flex w-full">
        <div className="mr-auto self-start" style={{ flexFlow: 'column' }}>
          {session?.user?.role === 1 && <CheckBox title="Share this post on Telegram" check={sharePostToTG} setCheck={setSharePostToTG} />}
          <div className="flex items-center">
            {canPostOnTwitter ? (
              <CheckBox title="Share this post on Twitter" check={sharePostToTwitter} setCheck={setSharePostToTwitter} />
            ) : (
              <>
                <Link
                  href={'/settings'}
                  rel="noopener nofollow ugc"
                  target={'_blank'}
                  className="mr-1 block text-[14px] font-semibold leading-[18px] text-reddit_blue"
                >
                  Connect accounts to share your post
                </Link>
                <div className="relative">
                  <i
                    className="icon"
                    title="Connect a Twitter account in your User Settings. With a connected account you can choose to share new posts you make directly to Twitter."
                  >
                    <AiOutlineInfoCircle className="text-reddit_text-darker" />
                  </i>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmitShareButtons
