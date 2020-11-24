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
        blue: {
          '100': '#72c1df',
          '200': '#5bb7d9',
          '300': '#43add4',
          '400': '#2ca2ce',
          '500': '#1498c9',
          '600': '#0B6E99',
          '700': '#107aa1',
          '800': '#0e6a8d',
          '900': '#0c5b79'
        },
        pink: {
          light: '#ff7ce5',
          DEFAULT: '#ff49db',
          dark: '#ff16d1',
        },
        gray: {
          darkest: '#1f2d3d',
          dark: '#3c4858',
          DEFAULT: '#c0ccda',
          light: '#e0e6ed',
          lightest: '#f9fafc',
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
