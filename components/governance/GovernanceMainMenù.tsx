import Link from 'next/link'
import { useRouter } from 'next/router'

const GovernanceMainMen├╣ = () => {
  const menu = [
    { title: 'Analytics', url: '/governance/analytics' },
    { title: 'Youtube', url: '/governance/youtube' },
    { title: 'Twitter', url: '/governance/twitter' },
    { title: 'BBCNews', url: '/governance/news' },
  ]
  const router = useRouter()
  const active = router.pathname.match('analytics')
    ? 0
    : router.pathname.match('youtube')
    ? 1
    : router.pathname.match('youtube')
    ? 2
    : router.pathname.match('news')
    ? 3
    : 0
  return (
    <div
      className={
        'mb-3 overflow-hidden rounded-md border border-reddit_border bg-reddit_dark-brighter text-sm'
      }
    >
      <div className="flex w-full items-center justify-center">
        {menu.map((m, index) => (
          <Link key={index} href={m.url} shallow={true}>
            <a className={`text-reddit_text-darker ${index === active ? 'font-extrabold text-reddit_text' : ''}`}>
              <p className={`mx-3 py-3`}>{m.title}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default GovernanceMainMen├╣;

