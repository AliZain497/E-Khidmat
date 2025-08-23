/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#15803d",   // green-700
        secondary: "#f3f4f6", // gray-100
      },
    },
  },
  plugins: [],
};
