import '../styles/globals.css'
import '../styles/submit.css'
import '../styles/post.css'
import '../styles/videoMobile.css'
import { UserContextProvider } from '../components/auth/UserContext'
import type { AppProps } from 'next/app'
import { AuthModalContextProvider } from '../components/auth/modal/AuthModalContext'
import { CommunityContextProvider } from '../components/community/CommunityContext'
import { TimeMsgContextProvider } from '../components/main/TimeMsgContext'
import { GoogleOAuthProvider } from '../components/auth/providers/google/GoogleOAuthProvider'
import Layout from '../components/main/layout/Layout'
import { useEffect } from 'react'
import Head from 'next/head'
import { siteUrl } from '../components/main/config'
import { getUserInfo } from '../lib/IPinfo'
import telegramapis from '../components/API/telegramapis'
import { useRouter } from 'next/router'
interface App {
  session: SessionProps
  error: string
}

const MyApp = ({ Component, pageProps: { session, error, ...pageProps } }: AppProps<App>) => {
  const router = useRouter()
  useEffect(() => {
    const tracker = async () => {
      try {
        if (!router.isReady) return
        if (session?.user?.role === 1) return
        if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') return
        const info = await getUserInfo()
        await telegramapis.sendLog(
          `New session: ${session.user?.username.toLowerCase() || 'unknown user'}` +
            ', Country: ' +
            info.country.toLowerCase() +
            ', City: ' +
            info.city.toLowerCase() +
            ', Page: ' +
            router.asPath
        )
      } catch (err) {}
    }
    tracker()
  }, [])

  return (
    <>
      <Head>
        <meta name="twitter:creator" content="@Bbabystyle" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <link rel="apple-touch-icon" sizes="57x57" href={`${siteUrl}/apple-touch-icon-57x57.png`} />
        <link rel="apple-touch-icon" sizes="60x60" href={`${siteUrl}/apple-icon-60x60.png`} />
        <link rel="apple-touch-icon" sizes="72x72" href={`${siteUrl}/apple-touch-icon-72x72.png`} />
        <link rel="apple-touch-icon" sizes="76x76" href={`${siteUrl}/apple-touch-icon-76x76.png`} />
        <link rel="apple-touch-icon" sizes="114x114" href={`${siteUrl}/apple-touch-icon-114x114.png`} />
        <link rel="apple-touch-icon" sizes="120x120" href={`${siteUrl}/apple-touch-icon-120x120.png`} />
        <link rel="apple-touch-icon" sizes="144x144" href={`${siteUrl}/apple-touch-icon-144x144.png`} />
        <link rel="apple-touch-icon" sizes="152x152" href={`${siteUrl}/apple-touch-icon-152x152.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${siteUrl}/apple-touch-icon-180x180.png`} />
        <link rel="icon" type="image/png" sizes="192x192" href={`${siteUrl}/android-chrome-192x192.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${siteUrl}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="96x96" href={`${siteUrl}/android-icon-96x96.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${siteUrl}/favicon-16x16.png`} />
        <link rel="manifest" href={`${siteUrl}/manifest.json`} />
        <meta name="msapplication-TileColor" content="#030303" />
        <meta name="msapplication-TileImage" content={`${siteUrl}/mstile-150x150.png`} />
        <meta name="theme-color" content="#1a1a1b" />
        <meta name="application-name" content="bbabystyle" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="bbabystyle" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <UserContextProvider session={session}>
        <AuthModalContextProvider>
          <CommunityContextProvider>
            <TimeMsgContextProvider>
              <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
                <Layout error={error}>
                  <Component {...pageProps} />
                </Layout>
              </GoogleOAuthProvider>
            </TimeMsgContextProvider>
          </CommunityContextProvider>
        </AuthModalContextProvider>
      </UserContextProvider>
    </>
  )
}

export default MyApp
