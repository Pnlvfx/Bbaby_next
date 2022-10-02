import Link from 'next/link';
import { CSSProperties } from 'react';
import { useSession } from '../../../auth/UserContext';
import { postRequestHeaders } from '../../../main/config';
import { CloseIcon } from '../../SVG';
import style from './cookie-consent.module.css';

const CookieConsent = () => {
  const {session, setSession} = useSession();

  const eu_cookie = async (status: boolean) => {
    try {
      const server = process.env.NEXT_PUBLIC_SERVER_URL;
      const url = `${server}/eu_cookie`;
      const body = JSON.stringify({status});
      const res = await fetch(url, {
        method: 'POST',
        headers: postRequestHeaders,
        credentials: 'include',
        body
      });
      if (res.ok) {
        const data = await res.json();
        setSession({...session, eu_cookie: data});
      }
    } catch (err) {
      
    }
  }

  return (
    <>
    <div className={'hidden md:block'}>
      <div className={style.cookieContainer}>
        <section>
          <div 
            className={`${style.cookieConsent}`}
            style={{
              opacity: 1,
              transform: 'translateY(0px) scale(1, 1)'
            }}
          >
            <section className='flex items-center flex-col my-[6px] ml-[6px]'>
              <span className="text-[14px] leading-[21px] flex-1 mx-3">
                We use cookies on our website for a number of purposes, including
                analytics and performance, functionality and advertising.{' '}
                <Link href={'/policies/cookies'}>
                  <a target={'_blank'} className="text-[#4BB3F3]">
                    Learn more about Bbaby&apos;s use of cookies.
                  </a>
                </Link>
              </span>
              <section className="flex justify-between mt-3 items-center">
                <button
                  className={`${style.cookieButtons} mr-3`}
                  role={'button'}
                  tabIndex={0}
                  onClick={async () => {
                    await eu_cookie(false);
                  }}
                >
                  Reject non-essential
                </button>
                <button
                  className={style.cookieButtons}
                  onClick={async () => {
                    await eu_cookie(true);
                  }}
                >
                  <p className='text-reddit_dark'>Accept all</p>
                </button>
              </section>
            </section>
          </div>
        </section>
      </div>
    </div>
    <div className='text-[0.875rem] relative bg-reddit_dark-brighter rounded-[4px] block my-4 p-4 border border-solid border-[#3a3a3c] md:hidden'>
        <button
          name='close'
          aria-label='close cookie'
          className='p-1 absolute right-1 top-1'
          onClick={async () => {
            await eu_cookie(true);
          }}
        >
          <i className='inline-block align-middle leading-[1em]'>
            <CloseIcon className='h-[1em] w-auto leading-4' />
          </i>
        </button>
          Cookies help us deliver out Services. we only use essential cookies.{' '}
          <Link href={'/policies/cookies'}>
            <a target={'_blank'} className='text-reddit_blue'>
              Cookie policy
            </a>
          </Link>
    </div>
    </>
  )
}

export default CookieConsent;
