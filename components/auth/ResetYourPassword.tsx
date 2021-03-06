import { inputClass } from '../utils/Input'
import {useState,useContext, SetStateAction} from 'react'
import { buttonClass } from '../utils/Button';
import { AuthModalContextProps, AuthModalContext } from './AuthModalContext';
import Image from 'next/image';
import Logo from '../../public/logo.png'

function ResetYourPassword() {

    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const modalContext = useContext(AuthModalContext) as AuthModalContextProps;
    const {setShow} = modalContext

  return (
    <div className=''>
        <div className='rounded-full'>
            <Image src={Logo} alt="" width={'40px'} height={'40px'}/>
        </div>
        <p className='font-bold'>Reset your password</p>
        <div className='w-[600px] pr-48 pt-1'>
            <p>Tell us the username and email address associated with your Bbabystyle account, and we&apos;ll send you an email with a link to reset your password.</p>
        </div>
            <div className='pt-4'>
                <label>
                    <span className='text-reddit_text-darker text-sm'>Username:</span>
                    <input type='text' className={`mb-3 w-80 p-2 ${inputClass}`} value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                {/* {status.err && showErrMsg(status.err)} */}
                <label>
                    <span className='text-reddit_text-darker text-sm'>E-mail:</span>
                    <input type='email' className={`p-2 mb-3 w-80 ${inputClass}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
            </div>
            <div>
                <button className={`w-48 py-2 mb-3 ${buttonClass()}`} onClick={() => null}>
                    Reset Password
                </button>
            </div>
                <button className="text-reddit_blue font-bold text-xs">FORGOT USERNAME?</button>
                <div>
                    <p className='text-sm pt-4'>Don&apos;t have an email or need assistance loggin in? Get help.</p>
                </div>
                <div className='pt-4 flex pb-24'>
                {/* <button className="text-sm text-blue-500 ml-1 font-semibold" onClick={() => setShow('login')}>LOG IN</button>
                <div className='pl-1'>-</div>
                <button className="text-sm text-blue-500 ml-1 font-semibold" onClick={() => setShow('register')}>SIGN UP</button> */}
                </div>
    </div>
  )
}

export default ResetYourPassword;