/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens:{
        'max-md': {'max': '786px'}
      },
      fontWeight: {
        
        thin: '300',
        normal: '400',     // default
        medium: '500',     // default
      
      }
      ,
      colors: {
        primary: {
          DEFAULT: '#f4ad44', // Primary color base
          light: '#6cb2eb', // Lighter shade for hover or active states
          dark: '#2779bd', // Darker shade
        },
        secondary: {
          DEFAULT: '#ffed4a', // Secondary color base
          light: '#fff382', // Lighter shade
          dark: '#f9ca24', // Darker shade
        },
        text_primary:{
            DEFAULT: '#263238'
        },
        html_bgColor:{
         DEFAULT:"#ffffff"
        },
        error:{
          DEFAULT:"#bb1a1c"
        }
      },
    },
  },
  plugins: [],
});
