// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

// TailwindCSS
// Read more on how to add other base styles https://tailwindcss.com/docs/adding-base-styles
// Extracting components https://tailwindcss.com/docs/extracting-components
// Or adding new utilities https://tailwindcss.com/docs/adding-new-utilities
import "tailwindcss/base.css"
import "tailwindcss/components.css"
import "tailwindcss/utilities.css"
// import "tailwindcss/colors.css"

// Markdown formatting, uses Tailwind @apply primitive to apply Tailwind's utility classes to
// elements created by the Markdown parser
import "./src/notion.css"
// import "./src/toggle.css"


import React from 'react';
import ThemeContextProvider from './src/context/themeContext';
export const wrapRootElement = ({ element }) => {
  return <ThemeContextProvider>{element}</ThemeContextProvider>;
};
// const io = import(`intersection-observer`)

// export const onClientEntry = () => {
//   // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
//   if (!(`IntersectionObserver` in window)) {
//     import(`intersection-observer`)
//     console.log(`# IntersectionObserver is polyfilled!`)
//   }
// }





// import React from 'react';

// import App from './src/components/App';

// export const wrapRootElement = ({ element }) => {
//   return <App>{element}</App>;
// };
