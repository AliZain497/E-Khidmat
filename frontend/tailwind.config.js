/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeInSlideIn: 'fadeInSlideIn 0.8s ease-out forwards',
      },
      keyframes: {
        fadeInSlideIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      colors: {
        primary: "#15803d",   // green-700
        secondary: "#f3f4f6", // gray-100
      },
      screens: {
        custom: '1050px', // 👈 this is your breakpoint
      },
    },
  },
  
  plugins: [],
};

