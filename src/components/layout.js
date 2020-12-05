import React, { useContext } from 'react';
import { Link } from "gatsby"
import PropTypes from 'prop-types';
import { ThemeContext } from '../context/themeContext';
import ThemeToggle from "./ThemeToggle"
import GatsbyBackgroundImage from './GatsbyBackgroundImage'

const Layout = (props) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { title, children, page_image } = props
  let header

  let toggle = (
    <div className="absolute top-0 right-0 h-48 w-48">
      <ThemeToggle toggle={{ theme, setTheme }} />
    </div>
  )

  if (!page_image || page_image === '') {
    header = (
      <h1 className="text-5xl max-w-5xl mx-auto">
        <Link className="leading-loose shadow-none text-notion-DEFAULT-txt pl-6" to={`/`}>
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <GatsbyBackgroundImage
        tag="div"
        id="siteHeader"
        className="bg-header bg-nav-top"
        node={page_image}
      >
        <div className="bg-nav-top" style={{ height: '100vh' }}>
          <h2 className="text-5xl max-w-5xl mx-auto px-5 py-0 ">
            <Link className="leading-loose shadow-none text-white" to={`/`}>
              {title}
            </Link>
          </h2>
        </div>
      </GatsbyBackgroundImage >
    )
  }
  return (
    <div
      className={`${theme === 'light' ? 'theme-light' : 'theme-dark'
        } bg-notion-DEFAULT-bkg text-notion-DEFAULT-txt transition-all duration-300 m-0 p-0 min-h-screen`}>
      <div className="mx-auto px-5 py-0">
        <header>{header}</header>
      </div>
      <main className="max-w-5xl mx-auto px-5 py-0">
        {children}
      </main>
      <footer className="max-w-6xl mx-auto px-5 py-5 ">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
      { toggle}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout
