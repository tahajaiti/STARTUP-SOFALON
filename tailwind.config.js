const { addDynamicIconSelectors } = require("@iconify/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html", "./public/assets/js/*.js"],
  theme: {
    extend: {
      colors: {
        dark: "#232020",
        black: "#000000",
        gray: "#363537",
        white: "#FFFFFF",
        mustard: "#FEFAE0",
        lBrown: "#DDA15E",
        dBrown: "#AA6122",
      },
      fontFamily: {Mont: ["Montserrat", "sans-serif",]},
    },
  },
  plugins: [addDynamicIconSelectors(),],
};
