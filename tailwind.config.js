/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "7A3E7B",
        orange:"#F6828C",
        yellow:"#FFEAAE",
        grey:"#A5959",
      },
    },
  },
  plugins: [],
}

