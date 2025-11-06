/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        telugu: ['Noto Sans Telugu', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#f97316', // orange-500 color code
          dark: '#ea580c',    // orange-600
          light: '#fdba74'    // orange-300
        }
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ['active'],
      backgroundOpacity: ['active'],
    },
  },
};
