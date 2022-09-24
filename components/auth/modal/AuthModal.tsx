import { useState, useContext, useEffect, FormEvent } from 'react';
import {AuthModalContext, AuthModalContextProps} from './AuthModalContext';
import { buttonClass, Spinner } from '../../utils/Button';
import { showErrMsg } from '../../utils/validation/Notification';
import NewEmailNotif from '../NewEmailNotif';
import ResetYourPassword from '../ResetYourPassword';
import Google from '../providers/google/Google';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import UserPreferencesModal from '../../user/UserPreferencesModal';
import AuthImage from '../../../public/authImage.png';
import { CloseIcon } from '../../utils/SVG';
import { NextComponentType } from 'next';
import { authInput } from '../authInput';
import * as gtag from '../../../lib/gtag';
import { loginUrl } from '../../../lib/url';
import { postRequestHeaders } from '../../main/config';
import { register } from '../../API/oauthAPI';
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext';

export type StatusProps = {
  err?: string
}

const AuthModal: NextComponentType = () => {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<StatusProps>({})
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();
  // IF NEW USER
  const [EmailTo, setEmailTo] = useState('')
  const modalContext = useContext(AuthModalContext) as AuthModalContextProps;
  const message = useContext(TimeMsgContext) as TimeMsgContextProps;
  const { show, setShow } = modalContext;
  const visibleClass = show === 'hidden' ? 'hidden' : 'block'

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const doRegister = async () => {
    try {
      setLoading(true);
      const data = await register(email, username, password);
      message.setMessage({ value: data?.msg, status: 'success' });
      localStorage.setItem('isLogged', 'true');
      setEmailTo(email);
      setShow('hidden');
      gtag.registerAnalytics();
      router.reload()
    } catch (err) {
      if (err instanceof Error) {
        setStatus({ err: err.message });
      } else {
        setStatus({ err: 'Unknown error' });
      }
      setLoading(false);
    }
  }

  const login = async () => {
    try {
      setLoading(true)
      const body = JSON.stringify({ username, password })
      const res = await fetch(loginUrl, {
        method: 'post',
        body,
        headers: postRequestHeaders,
        credentials: 'include'
      })
      const data = await res.json();
      if (res.ok) {
        message.setMessage({ value: data?.msg, status: 'success' });
        localStorage.setItem('isLogged', 'true')
        gtag.loginAnalytics();
        router.reload()
      } else {
        setStatus({ err: data?.msg})
        setLoading(false)
      }
    } catch (err) {
        setStatus({ err: 'Unknown error'})
        setLoading(false)
    }
  }

  const closeModal = async () => {
    setShow('hidden')
    setEmail('')
    setPassword('')
    setUsername('')
    setStatus({})
    setLoading(false);
  }

  // ONLY AFTER FIRST LOGIN
  const [newUser, setNewUser] = useState('')
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
      setNewUser(firstLogin)
    }
  }, [])

  return (
    <>
      <div className={'fixed top-0 left-0 z-30 flex h-screen w-screen bg-[rgba(0,0,0,.6)] ' + visibleClass}>
        <main className="mx-auto mt-5 flex w-[90%] max-w-[850px] self-center rounded-md border border-reddit_dark-brightest bg-reddit_dark-brighter md:w-[60%] xl:w-[70%] 2xl:w-[40%]">
          <div className='w-full flex'>
            <div className="relative hidden w-[128px] lg:block">
              <Image src={AuthImage} alt="Auth Image" layout="fill" />
            </div>
            <div className="mt-16 ml-6 max-w-[320px] flex-none">
              <p className="mb-2 text-2xl">{show === 'login' ? 'Login' : show === 'register' ? 'Sign up' : ''}</p>
              {show === 'login' && (
                <>
                  <p className="mb-6 text-[12px]">
                    By continuing, you agree to our{' '}
                    <Link href={'/policies/user-agreement'}>
                      <a target="_blank" className="text-blue-400">
                        User Agreement
                      </a>
                    </Link>{' '}
                    and{' '}
                    <Link href={'/policies/privacy-policy'}>
                      <a target="_blank" className="text-blue-400">
                        Privacy Policy
                      </a>
                    </Link>
                    .
                  </p>
                  <Google setLoading={setLoading} />
                  <form method="post" autoComplete='on' onSubmit={(handleSubmit)}>
                    {authInput('username','text',status,username,setUsername,'username')}
                    {status.err && showErrMsg(status.err)}
                    {authInput('password','password',status,password,setPassword,'current-password')}
                      <button
                        disabled={loading}
                        type="submit"
                        className={`mb-3 h-[37px] w-full ${buttonClass()}`}
                        onClick={(e) => {
                          e.preventDefault()
                          login()
                        }}
                      >
                        {loading && <Spinner />}
                        {!loading && <p>Log In</p>}
                      </button>
                  </form>
                  <div>
                    <p className="mb-6 text-sm">
                      Forgot your{' '}
                      <button className="text-blue-400">username</button> or{' '}
                      <button
                        className="text-blue-400"
                        onClick={() => setShow('reset-your-password')}
                      >
                        password
                      </button>{' '}
                      ?
                    </p>
                  </div>
                    <div className="mt-3 text-sm mb-24">
                      New to Bbaby?{' '}
                      <button
                        className="ml-1 font-semibold text-blue-500"
                        onClick={() => setShow('register')}
                      >
                        SIGN UP
                      </button>
                    </div>
                </>
              )}
              {show === 'register' && (
                <>
                  <p className="mb-6 text-[12px]">
                    By continuing, you are setting up a Bbabystyle account and
                    agree to our{' '}
                    <Link href={'/policies/user-agreement'}>
                      <a target="_blank" className="text-blue-400">
                        User Agreement
                      </a>
                    </Link>{' '}
                    and{' '}
                    <Link href={'/policies/privacy-policy'}>
                      <a target="_blank" className="text-blue-400">
                        Privacy Policy
                      </a>
                    </Link>
                    .
                  </p>
                  <Google setLoading={setLoading} />
                  <form
                    autoComplete="off"
                    noValidate
                    method="post"
                    onSubmit={handleSubmit}
                  >
                    {authInput('E-mail','email',status,email,setEmail,'off')}
                    {status.err && showErrMsg(status.err)}
                    {authInput('Username','text',status,username,setUsername,'off')}
                    {authInput('Password', 'password', status,password,setPassword,'off')}
                        <button
                        disabled={loading}
                        type="submit"
                        className={`mb-3 h-[37px] w-full ${buttonClass()}`}
                        onClick={(e) => {
                          e.preventDefault()
                          doRegister()
                        }}
                      >
                        {loading && <Spinner />}
                        {!loading && <p>Sign Up</p>}
                      </button>
                  </form>
                  <div className="mt-3 text-sm mb-24">
                    Already have an account?{' '}
                    <button
                      className="ml-1 font-semibold text-blue-500"
                      onClick={() => setShow('login')}
                    >
                      LOG IN
                    </button>
                  </div>
                </>
              )}
              {show === 'reset-your-password' && <ResetYourPassword/>}
            </div>
          </div>
          <div id="closeButton" className="mr-3 mt-3 h-7 w-7 text-right">
            <button onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                closeModal();
              }}
            >
              <div className="p-1">
                <CloseIcon className='w-5 h-5' />
              </div>
            </button>
          </div>
        </main>
      </div>
      <>
        {EmailTo && <NewEmailNotif email={EmailTo} />}
        {newUser && <UserPreferencesModal setNewUser={setNewUser} />}
      </>
    </>
  )
}

export default AuthModal;

