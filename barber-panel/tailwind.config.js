/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif']
      },
      colors: {
        'dark-background': '#181818',
        'dark-foreground': '#0D0D0D'
      }
    },
  },
  plugins: [],
}

