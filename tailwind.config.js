import { keepTheme } from 'keep-react/keepTheme'

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {}
  },
  plugins: []
}

export default keepTheme(config)
