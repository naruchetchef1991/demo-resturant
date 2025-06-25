/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'thai': ['Kanit', 'sans-serif'],
        'kanit': ['Kanit', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdedd6',
          200: '#fbd9ad',
          300: '#f7be78',
          400: '#f29b41',
          500: '#ee7f1b',
          600: '#df6211',
          700: '#b84710',
          800: '#933914',
          900: '#783013',
        },
        line: {
          green: '#06C755',
          'green-dark': '#05b04f',
        }
      },
      screens: {
        'xs': '475px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
} 