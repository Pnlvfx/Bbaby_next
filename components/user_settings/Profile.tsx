import { useState, useRef, ChangeEvent } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Image from 'next/image'
import { useMessage } from '../main/TimeMsgContext'
import { useSession } from '../auth/UserContext'
import userapis from '../API/userapis'
import { catchErrorWithMessage } from '../API/common'

const Profile = () => {
  const { session } = useSession()
  const [selectedFile, setSelectedFile] = useState(session?.user?.avatar)
  const filePickerRef = useRef<HTMLInputElement>(null)
  const message = useMessage()

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e?.target?.files?.length > 0) {
      const file = e.target.files[0]
      previewFile(file)
    }
  }

  const previewFile = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = async () => {
      try {
        if (!reader.result) return
        setSelectedFile(reader.result.toString())
        const data = await userapis.changeAvatar(reader.result.toString())
        message.setMessage({ value: data.success, status: 'success' })
      } catch (err) {
        catchErrorWithMessage(err, message)
      }
    }
  }

  if (!session || !selectedFile) return null

  return (
    <div className="mt-6 max-w-[800px] space-y-6 font-semibold">
      <p className="text-[19px]">Costumize profile</p>
      <div>
        <p className="text-[11px] text-reddit_text-darker">PROFILE INFORMATION</p>
        <hr className="mt-1 border-reddit_border" />
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-[11px] text-reddit_text-darker">IMAGES</p>
          <hr className="mt-1 border-reddit_border" />
        </div>
        <div>
          <p className="text-sm font-bold">Avatar and banner image</p>
          <p className="text-sm text-reddit_text-darker">Images must be .png or .jpg format</p>
        </div>
      </div>
      <div className="">
        <div
          onClick={filePickerRef?.current?.click}
          className="relative flex h-36 w-36 cursor-pointer overflow-hidden rounded-full bg-reddit_dark-brightest"
        >
          <Image src={selectedFile} fill alt="user_image" />
          <AiOutlinePlus className="absolute mx-[95px] mt-[100px] h-8 w-8 text-reddit_text-darker" />
        </div>
        <input
          className="text-[16px]"
          hidden
          accept="image/png, image/jpeg"
          type="file"
          name="image"
          id="file_up"
          ref={filePickerRef}
          onChange={handleFileInputChange}
        />
      </div>
    </div>
  )
}

export default Profile
