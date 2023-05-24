/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0C7066',
        'accent': '#0D7D27',
        'darker': '#073D38',
        'white-prime': '#F2FFFE',
      }
    },
  },
  plugins: [],
}
