/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      colors: {
        cyberDark: "#0a0f1f",
        cyberGreen: "#00ff99",
        cyberRed: "#ff0033",
      },
    },
  },
  plugins: [],
};
