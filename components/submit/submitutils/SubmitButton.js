import {GrBold,GrEmoji} from 'react-icons/gr'
import {GoItalic} from 'react-icons/go'
import {BiLink} from 'react-icons/bi'
import { useRef,useState } from 'react';
import { AddImage } from '../../utils/SVG';

function SubmitButton(props) {

    const {title,setTitle,setSelectedFile,setIsImage,setImageHeight,setImageWidth} = props

    

    const Imageclass = 'p-2 text-reddit_text-darker'
    const iconClass = 'w-[22px] h-[22px]'

    const [showEmojis,setShowEmojis] = useState(false)
    const filePickerRef = useRef(null)
    
    
    //add image
    const addImageToPost = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    };

    const previewFile = (file) => {
        if(!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            let image_url = event.target.result
            let image = document.createElement("img")
            image.src = image_url

            image.onload = (e) => {
                // let canvas = document.createElement("canvas")
                // canvas.width = 800
                setImageHeight(e.target.height)
                setImageWidth(e.target.width)
                // let ratio = 800 / e.target.width
            }
            //document.getElementById("wrapper").appendChild(image)
        }
        reader.onloadend = () => {
            setSelectedFile(reader.result)
        }
    }


    
    

    //emoji
    const addEmoji = (e) => {
        let sym = e.unified.split("-")
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray)
        setTitle(title + emoji);
    }

  return (
    <div>
        <div className='flex ml-1'>
            <div className={Imageclass}>
                <button title='Bold'>
                    <GrBold className={iconClass} />
                </button>
            </div>
            <div className={Imageclass}>
                <button title='Italic'>
                    <GoItalic className={iconClass}/>
                </button>
            </div>
            <div className={Imageclass}>
                <button title='Link' onClick={() => {
                   
                    }} >
                    <BiLink className={iconClass}/>
                </button>
            </div>
            <div className={Imageclass}>
                <button title='Add an image' onClick={() => {
                    filePickerRef.current.click()
                    setIsImage(true)
                }}>
                    <AddImage />
                    <input type='file' hidden onChange={addImageToPost} ref={filePickerRef} />
                </button>
            </div>
            <div className={Imageclass}>
                <button title='Add emojis' onClick={() => {
                    setShowEmojis(!showEmojis)
                }}>
                    <GrEmoji className={iconClass} />
                </button>            
            </div>
            <div className={Imageclass + ' w-[80px] flex pt-0 ml-auto p-1'}>
                <button>
                    <h1 className='text-xs text-reddit_text font-bold'>Markdown Mode</h1>
                </button>     
            </div>
        </div>
    </div>
  )
}

export default SubmitButton