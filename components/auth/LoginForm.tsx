import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSession } from './UserContext'
import Link from 'next/link'
import Google from './providers/google/Google'
import AuthInput from './auth-input/AuthInput'
import { Spinner } from '../utils/buttons/Button'
import { useAuthModal } from './modal/AuthModalContext'
import oauthapis from '../API/oauthapis'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [usernameIsvalid, setUsernameIsValid] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')
  const [passwordIsValid, setPasswordIsValid] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const { session } = useSession()
  const router = useRouter()
  const authModal = useAuthModal()

  useEffect(() => {
    if (session?.user) {
      router.push('/')
    }
  }, [session])

  const doLogin = async () => {
    try {
      setLoading(true)
      await oauthapis.login(username, password)
      localStorage.setItem('isLogged', 'true')
      if (top?.window.location.href) {
        top.window.location.href = '/'
      } else {
        window.location.href = '/'
      }
      //authModal.setShow('hidden');
      setLoading(false)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else if (typeof err === 'string') {
        setError(err)
      } else {
        setError('Incorrect username or password')
      }
      setUsernameIsValid(false)
      setPasswordIsValid(false)
      setLoading(false)
    }
  }

  const validatePass = (input: HTMLInputElement['value']) => {
    setPassword(input)
  }

  const validateUsername = (input: HTMLInputElement['value']) => {
    setUsername(input)
  }

  return (
    <div className="block bg-white text-black">
      <main className="block">
        <div className="box-border flex min-h-[100vh] w-[100vw] flex-col items-center justify-center">
          <div className="box-border flex">
            <div className="box-border w-full max-w-[280px] self-center p-0">
              <div className="mx-auto box-border block w-[280px] max-w-[280px]">
                <h1 className="mt-6 text-xl">Log In</h1>
              </div>
              <p className=" mx-auto mt-2 text-xs">
                By continuing, you agree are setting up a Bbabystyle account and agree to our{' '}
                <Link target={'_blank'} href={'/policies/user-agreement'} className="text-reddit_blue">
                  User Agreement{' '}
                </Link>
                and{' '}
                <Link target={'_blank'} href={'/policies/privacy-policy'} className="text-reddit_blue">
                  Privacy Policy
                </Link>
                .
              </p>
              <form method="post" action="/login" className="m-auto box-border block w-[280px] max-w-[280px]">
                <div className="mt-8 mb-[18px] box-border">
                  <div className="box-border">
                    <div className="relative my-2 box-border block h-[44px] w-[280px] min-w-[280px] max-w-[400px]">
                      <Google />
                    </div>
                  </div>
                  <div className="mt-[20px] mb-6 flex items-center justify-between">
                    <span className="box-border w-[40%]" />
                    <span className="box-border w-[40%] text-sm font-bold">OR</span>
                    <span className="box-border w-[40%]" />
                  </div>
                </div>
                <AuthInput
                  id="loginUsername"
                  type="text"
                  name="username"
                  value={username}
                  validate={validateUsername}
                  error={''}
                  isValid={usernameIsvalid}
                  autoComplete={'on'}
                />
                {error && (
                  <div>
                    <p className="mx-4 text-sm text-reddit_red">{error}</p>
                  </div>
                )}
                <AuthInput
                  id="loginPassword"
                  type="password"
                  name="password"
                  value={password}
                  validate={validatePass}
                  error={''}
                  isValid={passwordIsValid}
                  autoComplete={'on'}
                />
                <div className="mt-4 text-[12px] leading-4">
                  Forget your{' '}
                  <Link href={''} className="font-bold leading-6 text-[#0079d3] underline">
                    username
                  </Link>{' '}
                  or{' '}
                  <Link href={''} className="font-bold leading-6 text-[#0079d3] underline">
                    password
                  </Link>{' '}
                  ?
                </div>
                <fieldset className="relative mt-4 max-w-[280px]">
                  <button
                    className="mt-2 h-[40px] w-full rounded-full bg-reddit_blue px-4 text-[14px] font-bold leading-4"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault()
                      doLogin()
                    }}
                  >
                    {loading ? <Spinner /> : 'Log In'}
                  </button>
                </fieldset>
                <div className="mt-4 box-border block text-[12px] leading-4">
                  New to Bbaby?{' '}
                  <Link
                    href={'/account/register'}
                    className="font-bold leading-6 text-[#0079d3] underline"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      if (router.pathname.match('register') || router.pathname.match('login')) {
                        router.push('/account/register')
                      } else {
                        authModal.setShow('register')
                      }
                    }}
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LoginForm
