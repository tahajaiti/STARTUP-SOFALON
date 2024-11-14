const { addDynamicIconSelectors } = require("@iconify/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        dark: "#232020",
        whittt: "#F6F6F6",
        mustard: "#FEFAE0",
        lBrown: "#DDA15E",
        dBrown: "#AA6122",
        SoftGray: '#878787',
        whiteGrey: '#F6F6F6',
      },
      fontFamily: { Mont: ["Montserrat", "sans-serif"] },
    },
  },
  plugins: [addDynamicIconSelectors()],
};