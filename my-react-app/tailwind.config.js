/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'customBlue': '#2471A3',
        'customPink': '#EC407A',
        'customyellow': '#FFEA00',
        'customGrey': '#34495E',
      },
    },
  },
  plugins: [],
}

