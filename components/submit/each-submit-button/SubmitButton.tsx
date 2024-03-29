import {GrBold} from 'react-icons/gr'
import {GoItalic} from 'react-icons/go'
import {BiLink} from 'react-icons/bi'
import AddImage from './AddImage';
import AddVideo from './AddVideo';
import type { ReactNode } from 'react';

const SubmitButton = () => {
    const Button = (title: string, icon: ReactNode) => {
        return (
            <span className='h-8 w-8'>
                <button 
                    role={'button'}
                    tabIndex={-1} 
                    title={title}
                    className='submitButton transition-all'
                >
                    {icon}
                    <div className='bottom-0 left-0 absolute right-0 top-0'>
                        <div className={'submitButtonTitle transition-opacity'}>
                            {title}
                        </div>
                    </div>
                </button>
            </span>
        )
    }

    return (
        <>
            <div className='h-full w-full items-center ml-1 relative flex'>
                <div className='flex items-center absolute'>
                    {Button('bold', <GrBold className={'submitButtonIcon'} />)}
                    {Button('Italics', <GoItalic className={'submitButtonIcon'}/>)}
                    {Button('Link', <BiLink className={'submitButtonIcon'}/>)}
                    <AddImage />
                    <AddVideo />
                </div>
            </div>
            <div className={'relative'}>
                <button className='flex whitespace-pre-wrap relative border solid border-transparent text-[12px] font-bold leading-4 min-h-6 min-w-6 py-1 px-2 items-center justify-center rounded-full box-border w-auto text-center'>
                    <span>Markdown Mode</span>
                </button>     
            </div>
        </>
    )
}

export default SubmitButton;
