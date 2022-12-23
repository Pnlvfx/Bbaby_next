import Link from 'next/link'
import Router from 'next/router'
import { AiOutlineRead } from 'react-icons/ai'
import { FcVideoProjector } from 'react-icons/fc'
import { useSession } from '../auth/UserContext'
import ShareButton from '../post/postutils/ShareButton'

interface NewsButtonsProps {
  news: NewsProps
  isListing: boolean
  openNews: () => void
}

const NewsButtons = ({ news, isListing, openNews }: NewsButtonsProps) => {
  const { session } = useSession()
  return (
    <div
      id="buttons"
      className="mt-2 mr-2 flex items-center rounded-sm text-xs font-bold text-reddit_text-darker"
    >
      {isListing ? (
        <Link
          href={news.permalink}
          type="button"
          className="flex items-center rounded-md p-[10px] hover:bg-reddit_dark-brightest"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            openNews()
          }}
        >
          <AiOutlineRead className="h-5 w-5" />
          <p className="ml-1">News</p>
        </Link>
      ) : (
        <div className="flex items-center rounded-md p-[10px] hover:bg-reddit_dark-brightest">
          <AiOutlineRead className="h-5 w-5" />
          <p className="ml-1 text-xs">News</p>
        </div>
      )}
      {session?.user?.role === 1 && !session.device?.mobile && (
        <>
          <Link
            href={`/governance/youtube?title=${news.title}`}
            className="flex items-center rounded-md p-[10px] hover:bg-reddit_dark-brightest"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              Router.push({
                pathname: `/governance/youtube`,
                query: { title: news.title },
              })
            }}
          >
            <FcVideoProjector className="h-5 w-5" />
            <p className="ml-1 text-xs">Create video</p>
          </Link>
          <button className="flex items-center rounded-md p-[10px] hover:bg-reddit_dark-brightest">
            <AiOutlineRead className="h-5 w-5" />
            <p className="ml-1 text-xs">Edit News</p>
          </button>
        </>
      )}
      <ShareButton linkToCopy={news.permalink} isListing={isListing} />
    </div>
  )
}

export default NewsButtons
