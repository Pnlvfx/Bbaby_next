/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@bbabystyle/next-video-player/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        reddit_orange: '#f54404',
        reddit_red: '#f54404',
        reddit_dark: {
          DEFAULT: '#030303',
          brighter: '#1a1a1b',
          brightest: '#272729',
        },
        reddit_border: {
          DEFAULT: '#323334',
        },
        reddit_text: {
          DEFAULT: '#d7dadc',
          darker: '#818384',
        },
        reddit_hover: {
          DEFAULT: '#454546',
        },
        reddit_blue: {
          DEFAULT: '#24A0ED',
        },
      },
    },
  },
  plugins: [],
}
