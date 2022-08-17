namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SERVER_URL: string
    NEXT_PUBLIC_HOSTNAME: string
    NEXT_PUBLIC_GA_ID: string
    NEXT_PUBLIC_COOKIE_CONSENT_SECRET: string
    NEXT_PUBLIC_REDDIT_CLIENT_ID: string
    NEXT_PUBLIC_IP_LOOKUP_API_KEY: string
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: string
    NEXT_PUBLIC_LINK_PREVIEW_URL: string
    NEXT_PUBLIC_NODE_ENV: 'development' | 'production'
  }
}