/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/preline/preline.js',
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens : {
        sm : "576px",
        md : "786px",
        lg : "960px",
        xl : "1200px",
        "2xl" : "1400px",
      },
      container : {
        sm : "max-width : 540px",
        md : "max-width : 720px",
        lg : "max-width : 960px",
        xl : "max-width : 1140px",
        "2xl" : "max-width : 1320px",
      }

    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}