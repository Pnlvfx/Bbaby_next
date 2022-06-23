import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import Button from "../../utils/Button"
import Input from "../../utils/Input"
import EditText from 'react-edit-text'

const Youtube = () => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  //YOUTUBE INPUT
  const _value = {
    textColor: 'rgb(215, 218, 220)',
    community: 'Italy',
    fontSize: '48',
  }

  const initialState = {
    image: '',
    height: '',
    width: '',
    title: '',
    description: '',
    category: '',
    err: '',
    success: ''
}
  const [value,setValue] = useState(_value)
  const [showValue,setShowValue] = useState(true)
  const [input,setInput] = useState(initialState)
  const [showInput,setShowInput] = useState(false)
  const [loading,setLoading] = useState(false)
  //
  
  const createImage = async() => {
    setLoading(true)
    const data = {textColor: value.textColor, community:value.community,fontSize:value.fontSize}
    const res = await axios.post(`${server}/governance/create-image`,data, {withCredentials:true})
    setInput(res.data)
    setShowValue(false)
    setShowInput(true)
    setLoading(false)
  }

  const createVideo = async() => {
    try {
      const res = await axios.get(`${server}/governance/create-video`, {withCredentials:true}) 
    } catch (err) {
      
    }
  }
  return (
    <div id="display_youtube" className="w-full mx-12">
        <div className="border border-reddit_border ml-2 bg-reddit_dark-brighter rounded-md overflow-hidden">
        {showValue && (
          <>
            <form className="p-2 w-[350px] text-sm">
              <div id="set_community" className="mt-2 flex">
                    <div className="self-center">
                      <h1 className="">Community:</h1>
                    </div>
                    <div className="ml-auto self-center">
                      <Input type='text' title='community' value={value.community} onChange={setValue} className='p-2 font-bold'/>
                    </div>
                </div>
                <div id="set_text_color" className="mt-2 flex">
                    <div className="self-center">
                      <h1 className="">Text Color:</h1>
                    </div>
                    <div className="ml-auto self-center">
                      <Input type='text' title='text_color' value={value.textColor} onChange={setValue} className='p-2 font-bold'/>
                    </div>
                </div>
                <div id="set_font_size" className="mt-2 flex">
                    <div className="self-center">
                      <h1 className="">Font Size:</h1>
                    </div>
                    <div className="ml-auto self-center">
                      <Input type='text' title='font_size' value={value.fontSize} onChange={setValue} className='p-2 font-bold'/>
                    </div>
                </div>
            </form>
            <div id="create_image" className="mt-2 flex p-2">
                    <div className="self-center">
                      <h1 className="">Submit:</h1>
                    </div>
                    <div className="ml-auto self-center">
                      {loading && (
                        <Button disabled className='w-40 h-7 mb-3 ml-auto mr-5'>
                            <AiOutlineLoading3Quarters className='animate-spin mx-auto' />
                        </Button>
                      )}
                      {!loading && (
                        <Button type='submit' onClick={() => {
                          createImage()
                        }} className='w-40 h-7 mb-3 ml-auto mr-5'>
                            <h1>Create Image</h1>
                        </Button>
                      )}
                    </div>
                </div>
              </>
        )}
        {showInput && (
          <>
          <div className="flex">
            <form className="p-2 w-full text-sm">
              <div id="set_community" className="mt-2 flex">
                    <div className="self-center">
                      <h1 className="">Title:</h1>
                    </div>
                    <div className="ml-3 w-full self-center">
                      <EditText type='text' title='title' value={input.title} onChange={setInput} className='p-2 font-bold w-full truncate'/>
                    </div>
                </div>
                <div id="set_text_color" className="mt-2 flex">
                    <div className="self-center">
                      <h1 className="">Description:</h1>
                    </div>
                    <div className="ml-auto self-center">
                      <Input type='text' title='community' value={value.textColor} onChange={setValue} className='p-2 font-bold'/>
                    </div>
                </div>
                <div id="set_font_size" className="mt-2 flex">
                    <div className="self-center">
                      <h1 className="">Font Size:</h1>
                    </div>
                    <div className="ml-auto self-center">
                      <Input type='text' title='community' value={value.fontSize} onChange={setValue} className='p-2 font-bold'/>
                    </div>
                </div>
                <div id="set_category" className="mt-2 flex">
                    <div className="self-center">
                      <h1 className="">Category</h1>
                    </div>
                    <div className="ml-auto self-center">
                      <Input type='text' title='community' value={input.category} onChange={setInput} className='p-2 font-bold'/>
                    </div>
                </div>
            </form>
            <div className="p-2 mt-2">
              <Image src={input.image} height={input.height} width={input.width} />
            </div>
          </div>
          <div id="create_video" className="mt-2 flex p-2">
                  <div className="self-center">
                    <h1 className="">Submit:</h1>
                  </div>
                  <div className="ml-auto self-center">
                    {loading && (
                      <Button disabled className='w-40 h-7 mb-3 ml-auto mr-5'>
                          <AiOutlineLoading3Quarters className='animate-spin mx-auto' />
                      </Button>
                    )}
                    {!loading && (
                      <Button type='submit' onClick={() => {
                        createVideo()
                      }} className='w-40 h-7 mb-3 ml-auto mr-5'>
                          <h1>Create Video</h1>
                      </Button>
                    )}
                  </div>
              </div>
            </>
        )}
        </div>
      </div>
  )
}

export default Youtube

