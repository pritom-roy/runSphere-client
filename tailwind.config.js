/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Primary: '#0DB496',
        Secondary: '#383737',
        Background: '#F3F3F3',
        TextColor: '#888585',
        Title: '#3C3838',
      },
      fontFamily: {
        Heading: ['Oswald', 'serif'],
        Body: ['Montserrat', 'serif'],
      },
      backgroundImage: {
        'run1': "url('/run9.jpg')",
        'run2': "url('/run2.jpg')",
        'run3': "url('/run4.jpg')",
        'auth': "url('/bg.jpg')",
      },
    },
  },
  plugins: [daisyui],
  darkMode: 'class',
}
