/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js", // Flowbite support
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FE287A",
        secondary: "#FEE82E",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("flowbite/plugin"), // Flowbite plugin add korlam
  ],
};
