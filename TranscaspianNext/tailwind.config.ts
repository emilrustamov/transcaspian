/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "trans-brown": "#C2974A",
        "trans-gray": "#82806E",
        "trans-yellow": "#FFF9BA",
        "trans-red": "#981D26 ",
        "trans-light-gray": "#c7c7c7",
        "trans-light-brown": "#E2BB76",
        "trans-text-brown": "#FFF9BA"
      },
      boxShadow: {
        "3xl": '1px 3px 12px gray;'
      }
    },
  },
  plugins: [
    require('@khoohaoyit/tailwind-grid-center'),
  ],
}

