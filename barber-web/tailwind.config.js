/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'cormorant': ['Cormorant Garamond', 'serif'],
      },
      fontSize: {
        '10xl': ['20rem', { lineHeight: '1' }]
      },
      colors: {
        'charcoal': '#353535',
        'dark-background': '#181818',
        'dark-foreground': '#0D0D0D'
      }
    },
  },
  plugins: [],
}

