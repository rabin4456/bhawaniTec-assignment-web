/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors:{
        primary: {
          50:'#D8FFFB',
          100: '#D8FFFB',
          200: '#B1FFFD',
          300: '#8AF8FF',
          400: '#6DECFF',
          500: '#3DD8FF',
          600: '#2CABDB',
          700: '#1E82B7',
          800: '#135D93',
          900: '#0B437A',
        },
      }
    },
  },
  plugins: [],
};