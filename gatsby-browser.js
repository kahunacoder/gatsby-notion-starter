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

// Default css with notion colors
import "./src/notion.css"

import React from 'react';
import ThemeContextProvider from './src/context/themeContext';
export const wrapRootElement = ({ element }) => {
  return <ThemeContextProvider>{element}</ThemeContextProvider>;
};
