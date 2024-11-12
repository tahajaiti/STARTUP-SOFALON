const { addDynamicIconSelectors } = require("@iconify/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        dark: "#232020",
        gray: "#363537",
        mustard: "#FEFAE0",
        lBrown: "#DDA15E",
        dBrown: "#AA6122",
        SoftGray :'#878787',
        whiteGrey : '#F6F6F6',
      },
      fontFamily: {
        Mont: ["Montserrat", "sans-serif"], 
        
      },
    },
  },
  plugins: [
    addDynamicIconSelectors(), 
  ],
};