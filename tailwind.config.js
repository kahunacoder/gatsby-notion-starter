const defaultTheme = require("tailwindcss/defaultTheme")
// const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'DEFAULT-txt': 'var(--text-DEFAULT)',
        'gray-txt': 'var(--text-gray)',
        'orange-txt': 'var(--text-orange)',
        'red-txt': 'var(--text-red)',
        'purple-txt': 'var(--text-purple)',
        'brown-txt': 'var(--text-brown)',
        'pink-txt': 'var(--text-pink)',
        'yellow-txt': 'var(--text-yellow)',
        'blue-txt': 'var(--text-blue)',
        'green-txt': 'var(--text-green)',
        /* backgrounds */
        'DEFAULT-bkg': 'var(--bg-DEFAULT)',
        'gray-bkg': 'var(--bg-gray)',
        'orange-bkg': 'var(--bg-orange)',
        'red-bkg': 'var(--bg-red)',
        'purple-bkg': 'var(--bg-purple)',
        'brown-bkg': 'var(--bg-brown)',
        'pink-bkg': 'var(--bg-pink)',
        'yellow-bkg': 'var(--bg-yellow)',
        'blue-bkg': 'var(--bg-blue)',
        'green-bkg': 'var(--bg-green)',
      },
    },
  },
  variants: {},
  plugins: [],
}
