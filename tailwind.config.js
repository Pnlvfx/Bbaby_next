module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Helvetica"
        ],
      },
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
          DEFAULT: '#2E2E30'
        },
        reddit_blue: {
          DEFAULT: '#24A0ED'
        }
      },
    },
  },
  plugins: [],
}
