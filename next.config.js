/** @type {import('next').NextConfig} */
const NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com','lh3.googleusercontent.com','pbs.twimg.com'],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en"
  },
  productionBrowserSourceMaps: true
};

module.exports = NextConfig;