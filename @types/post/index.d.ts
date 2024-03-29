/* eslint-disable no-unused-vars */
interface PostProps {
  _id: string
  author: string
  title: string
  body: string
  community: string
  communityIcon: string
  mediaInfo?: {
    dimension: Array<number>
    isImage: boolean
    isVideo: boolean
    image: string
    video: {
      url: string
      thumbnail: string
    }
  }
  ups: number
  liked: null | boolean
  numComments: number
  createdAt: Date
  updatedAt: Date
  permalink: string
}
