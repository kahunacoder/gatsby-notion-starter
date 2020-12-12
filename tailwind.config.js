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
        'notion-DEFAULT-txt': 'var(--text-notion-DEFAULT)',
        'notion-gray-txt': 'var(--text-notion-gray)',
        'notion-orange-txt': 'var(--text-notion-orange)',
        'notion-red-txt': 'var(--text-notion-red)',
        'notion-purple-txt': 'var(--text-notion-purple)',
        'notion-brown-txt': 'var(--text-notion-brown)',
        'notion-pink-txt': 'var(--text-notion-pink)',
        'notion-yellow-txt': 'var(--text-notion-yellow)',
        'notion-blue-txt': 'var(--text-notion-blue)',
        'notion-green-txt': 'var(--text-notion-green)',
        /* backgrounds */
        'notion-DEFAULT-bkg': 'var(--bg-notion-DEFAULT)',
        'notion-gray-bkg': 'var(--bg-notion-gray)',
        'notion-orange-bkg': 'var(--bg-notion-orange)',
        'notion-red-bkg': 'var(--bg-notion-red)',
        'notion-purple-bkg': 'var(--bg-notion-purple)',
        'notion-brown-bkg': 'var(--bg-notion-brown)',
        'notion-pink-bkg': 'var(--bg-notion-pink)',
        'notion-yellow-bkg': 'var(--bg-notion-yellow)',
        'notion-blue-bkg': 'var(--bg-notion-blue)',
        'notion-green-bkg': 'var(--bg-notion-green)',
        'notion-code-bkg': 'var(--bg-notion-code)',
      },
    },
  },
  future: {
    purgeLayersByDefault: false,
  },
  purge: false,
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
