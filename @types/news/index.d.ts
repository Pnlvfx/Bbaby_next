interface mediaInfoProps {
    isImage?: boolean
    isVideo?: boolean
    image?: string
    video?: string
    width: number
    height: number
    alt: string
}

interface NewsProps {
    author: string
    title: string
    description: string
    permalink: string
    createdAt: Date
    _id: string
    mediaInfo: mediaInfoProps
}