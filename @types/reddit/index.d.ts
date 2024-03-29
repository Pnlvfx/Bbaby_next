interface RedditPostsProps {
  data: {
    author: string
    subreddit: string
    saved: boolean
    title: string
    hidden: boolean
    thumbnail_height: number
    thumbnail?: string //is the thumbnail of the image or video not the community icon
    media_only: boolean
    num_comments: number
    subreddit_subscribers: number
    selftext?: string
    upvote_ratio: number
    subreddit_type: 'private' | 'public'
    ups: number
    category: string | null
    is_robot_indexable: boolean
    url: string
    media: null | RedditMediaProps
    is_video: boolean
    created: string
    created_utc: string
    sr_detail?: {
      community_icon: string
    }
    preview: {
      enabled: boolean
      images: PreviewImagesProps[]
    }
    url: string
    id: string
  }
}

type PreviewImagesProps = {
  id?: string
  source: {
    height: number
    url: string
    width: number
  }
}

type RedditMediaProps = {
  reddit_video: {
    height: number
    width: number
    fallback_url: string
    dash_url: string
    hls_url: string
    is_gif: boolean
    transcoding_status: string
  }
}
