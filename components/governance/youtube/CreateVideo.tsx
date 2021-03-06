import { inputClass } from "../../utils/Input";
import { FaPause, FaPlay } from "react-icons/fa";
import Image from "next/image";
import {Dispatch, SetStateAction, useState} from "react";
import ReactHowler from 'react-howler';

interface CreateVideoProps {
  setVideoOptions: Dispatch<SetStateAction<VideoOptionsProps>>
  input: InputProps
  setInput: Dispatch<SetStateAction<InputProps>>
  videoOptions: VideoOptionsProps
}

const CreateVideo = ({setVideoOptions,input,setInput,videoOptions}:CreateVideoProps) => {
  const [imageIndex,setImageIndex] = useState(0)
  const [isPlaying,setIsPlaying] = useState(false)

  return (
   <>
   <div className="flex">
      <form className="p-2 w-full text-sm">
          {!input?.video && (
            <>
              <div id="fps" className="mt-2 flex items-center">
                  <p className="">Fps:</p>
                <div className="ml-auto">
                  <input type='number' title='fps' value={videoOptions.fps} onChange={(e) => setVideoOptions({...videoOptions,fps:e.target.value})} className={`${inputClass} p-2 font-bold`}/>
                </div>
            </div>
            <div id="transition" className="mt-2 flex">
                  <p className="">Transition:</p>
                <div className="ml-auto">
                  <input type='text' title='transition' value={videoOptions.transition} onChange={(e) => setVideoOptions({...videoOptions,transition:e.target.value})} className={`${inputClass} p-2 font-bold`}/>
                </div>
            </div>
            <div id="transition_duration" className="mt-2 flex">
                  <p className="">Transition_duration:</p>
                <div className="ml-auto">
                  <input type='text' title='transition_duration' value={videoOptions.transitionDuration} onChange={(e) => setVideoOptions({...videoOptions,transitionDuration:e.target.value})} className={`${inputClass} p-2 font-bold`}/>
                </div>
            </div>
            <hr className="border-reddit_border mt-4" />
            <div id="audio" className="mt-2 flex">
                <p className="">Audio:</p>
              <div className="ml-auto">
              <ReactHowler src={input.finalAudio} playing={isPlaying} onEnd={() => setIsPlaying(false)} />
                <button onClick={e => {
                  e.preventDefault()
                  setIsPlaying(!isPlaying)
                }} className="pr-[80px]">
                    {!isPlaying && <FaPlay className="w-6 h-6"/>}
                    {isPlaying && <FaPause className="w-6 h-6"/>}
                </button>
              </div>
            </div>
            </>
          )}
          {input?.video && (
            <>
              <div id="set_title" className="mt-2 flex">
                <div>
                  <p className="mt-[8px]">Title:</p>
                </div>
                <div className="ml-auto w-full self-center">
                  <textarea 
                  title='title' 
                  value={input.title} 
                  onChange={(e) => {setInput({...input,title:e.target.value})}} 
                  className='p-2 font-bold w-full bg-reddit_dark-brighter min-h-[100px] max-h-[335px]'
                  />
                </div>
              </div>
              <div id="set_description" className="mt-2 flex">
                  <div>
                    <p className="mt-[8px]">Description:</p>
                  </div>
                  <div className="ml-auto w-full self-center">
                    <textarea 
                    title='description' 
                    value={input.description} 
                    onChange={(e) => {setInput({...input,description:e.target.value})}} 
                    className='p-2 font-bold w-full bg-reddit_dark-brighter min-h-[135px] max-h-[335px]'
                    />
                  </div>
              </div>
              <div id="keywords" className="mt-2 flex">
                  <div className="self-center">
                    <p className="">Keywords:</p>
                  </div>
                  <div className="ml-auto self-center">
                    <input type='text' title='keywords' value={input.keywords} onChange={(e) => setInput({...input,keywords:e.target.value})} className={`p-2 font-bold ${inputClass}`}/>
                  </div>
              </div>
              <div id="category" className="mt-2 flex">
                  <div className="self-center">
                    <p className="">Category:</p>
                  </div>
                  <div className="ml-auto self-center">
                    <input type='text' title='keywords' value={input.category} onChange={(e) => setInput({...input,category:e.target.value})} className={`p-2 font-bold ${inputClass}`}/>
                  </div>
              </div>
              <div id="privacyStatus" className="mt-2 flex">
                  <div className="self-center">
                    <p className="">PrivacyStatus:</p>
                  </div>
                  <div className="ml-auto self-center">
                    <input type='text' title='privacyStatus' value={input.privacyStatus} onChange={(e) => setInput({...input,privacyStatus:e.target.value})} className={`p-2 font-bold ${inputClass}`}/>
                  </div>
              </div>
            </>
          )}
      </form>
      <div className="p-6 ml-auto mt-2">
        {!input?.video && (
          <div onClick={() => {
            if (imageIndex !== input.images.length - 1) {
              setImageIndex(imageIndex + 1)
            } else {
              setImageIndex(0)
            }
          }} className='cursor-pointer' >
            <Image src={input.images[imageIndex]} alt='' width={input.width} height={input.height} unoptimized/>
          </div>
        )}
        {input?.video && (
              <video className={`aspect-video`} 
              src={input.video}
              id='video_pre-share'
              poster={input.images[0]}
              controls
              width={input.width}
              height={input.height}
              />
        )}
      </div>
    </div>
   </>
  )
}

export default CreateVideo