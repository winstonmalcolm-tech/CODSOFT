/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fade: 'fade 1s ease-in-out forwards',
        fadeout: 'fadeout 1s ease-out forwards'
      },

      keyframes: {
        fade: {
          '0%': {
            opacity: "0",
            transform: "translateY(1000px)"
          },
          '100%': {
            opacity: "1",
            transform: "translateY(0px)"
          }
        },

        fadeout: {
          '0%': {
            opacity: "1",
            transform: "translateY(0px)"
          },
          '100%': {
            opacity: "0",
            transform: "translateY(1000px)"
          }
        }
      },

      colors: {
        'orange': "#d6b64f",
        'yellow': "#d6b64f",
        'gold': "#ad8056"
      }
    },
  },
  plugins: [],
}

