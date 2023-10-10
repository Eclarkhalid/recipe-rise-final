/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["satoshi", "sans-serif"],
        inter: ["inter", "sans-serif"],
      },
      colors: {
        'text': '#031421',
        'background': '#e3f1fc',
        'primary': '#d36612',
        'secondary': '#e8ceba',
        'accent': '#3da136',
       },
       
    },

  },
  plugins: [],
}