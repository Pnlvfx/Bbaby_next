import { ChangeEvent, useRef } from 'react'
import { useMessage } from '../../main/TimeMsgContext'
import { VideoIcon } from '../../utils/SVG/SVG'
import { useSubmitProvider } from '../SubmitContext'

const AddVideo = () => {
  const message = useMessage()
  const errMessage = `Sorry, we accept only images (.png, .jpeg, .gif) and videos (.mp4, .mov)`
  const { setSelectedFile, setIsVideo, setWidth, setHeight, setIsImage } = useSubmitProvider()
  const fileVideoRef = useRef<HTMLInputElement>(null)

  const addVideoToPost = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return message.setMessage({ value: errMessage, status: 'error' })
    const file = e?.target?.files[0]
    // importFileandPreview(file).then((res) => {
    //   setSelectedFile(res);
    // });
    previewVideo(file)
  }
  const previewVideo = (file: File) => {
    if (!file) return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const video_url = event.target?.result
      if (!video_url) return
      let video = document.createElement('video')
      video.preload = 'metadata'
      video.src = video_url.toString()
      video.addEventListener('loadedmetadata', () => {
        setWidth(video.videoWidth)
        setHeight(video.videoHeight)
      })
    }
    reader.onloadend = () => {
      setSelectedFile(reader.result)
    }
  }

  return (
    <span className="h-8 w-8">
      <button
        role={'button'}
        tabIndex={-1}
        className={'submitButton'}
        title="Add a video"
        onClick={() => {
          fileVideoRef && fileVideoRef?.current?.click()
          setIsImage(false)
          setIsVideo(true)
        }}
      >
        <VideoIcon className={'submitButtonIcon'} />
        <div className="absolute bottom-0 left-0 right-0 top-0">
          <div className={'submitButtonTitle transition-opacity'}>{'Add a video'}</div>
        </div>
        <input className="text-[16px]" type="file" accept="video/*" hidden onChange={addVideoToPost} ref={fileVideoRef} />
      </button>
    </span>
  )
}

export default AddVideo
