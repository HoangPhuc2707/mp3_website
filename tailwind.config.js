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
        'overlay-30': 'rgba(0,0,0,0.3)'
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
        },
        'rotate-center': {
          '0%': {
            '-webkit-transform': 'rotate(0);',
            transform: 'rotate(0)'
          },
          '100%': {
            '-webkit-transform': 'rotate(360deg);',
            transform: 'rotate(360deg);'
          }
        },
        'rotate-center-pause': {
          '0%': {
            '-webkit-transform': 'rotate(360deg);',
            transform: 'rotate(360deg)',
            'border-radius': '99999px'
          },
          '100%': {
            '-webkit-transform': 'rotate(0);',
            transform: 'rotate(0);'
          }
        },
        'scale-up-center': {
          '0%': {
            '-webkit-transform': 'scale(0);',
            transform: 'scale(0)',
          },
          '100%': {
            '-webkit-transform': 'scale(1);',
            transform: 'scale(1);'
          }
        },
        'scale-up-image': {
          '0%': {
            '-webkit-transform': 'scale(1);',
            transform: 'scale(1)',
          },
          '100%': {
            '-webkit-transform': 'scale(1.2);',
            transform: 'scale(1.2);'
          }
        },
        'scale-down-image': {
          '0%': {
            '-webkit-transform': 'scale(1.2);',
            transform: 'scale(1.2)',
          },
          '100%': {
            '-webkit-transform': 'scale(1);',
            transform: 'scale(1);'
          }
        },
      },
      animation: {
        'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'rotate-center': 'rotate-center 8s linear infinite;',
        'rotate-center-pause': 'rotate-center-pause 0.2s linear 1 both;',
        'scale-up-center': 'scale-up-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'scale-up-image': 'scale-up-image 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'scale-down-image': 'scale-down-image 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
      },
      flex: {
        '4': '4 4 0%',
        '3': '3 3 0%',
        '6': '6 6 0%',
        '7': '7 7 0%',
      }
    },
    screens: {
      '1200': '1200px'
    }
  },
  plugins: [],
}