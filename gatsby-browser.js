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
import "./src/markdown.css"

import React from 'react';

import App from './src/components/App';

export const wrapRootElement = ({ element }) => {
  return <App>{element}</App>;
};
