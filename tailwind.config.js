/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'main-100': '#FFFFFF',
        'main-200': '#F2F2F2',
        'main-300': '#E6E6E6',
        'main-400': '#D9D9D9',
        'main-500': '#0E8080',
      },
      colors: {
        'main-100': '#FFFFFF',
        'main-200': '#F2F2F2',
        'main-300': '#E6E6E6',
        'main-400': '#D9D9D9',
        'main-500': '#0E8080',
      },
      keyframes: {
        'slide-left': {
          '0%': {
            '-webkit-transform': 'translateX(500px);',
            transform: 'translateX(500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        }
      },
      animation: {
        'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;'
      },
      flex: {
        '4': '4 4 0%'
      }
    },
    screens: {
      '1200': '1200px'
    }
  },
  plugins: [],
}