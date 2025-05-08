/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'xl':'1px 1px 3px 1px #cfcfcf;'
      },
    },
  },
  plugins: [],
}

