import React, { useContext } from 'react';
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import PropTypes from 'prop-types';
import { ThemeContext } from '../context/themeContext';
import BackgroundImage from 'gatsby-background-image-es5'
// import { rhythm, scale } from "../utils/typography"
import ThemeToggle from "./ThemeToggle"

const Layout = (props) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const { location, title, section, children, page_image, page_url } = props
  const rootPath = `${__PATH_PREFIX__}/`
  let header


  if (location.pathname === rootPath) {
    header = (
      <div>
        <div className="float-right text-alignright pr-5 py-0">
          <ThemeToggle toggle={{ theme, setTheme }} />
        </div>
        <h1 className="text-5xl pl-20 py-10">
          <Link className="shadow-none text-notion-DEFAULT-txt pl-6" to={`/`}>
            {title}
          </Link>
        </h1>
      </div>
    )
  } else {
    header = (
      <BackgroundImage
        Tag="div"
        className="bg-header"
        fluid={page_image}
      >
        <div className="float-right text-alignright pr-5 py-0">
          <ThemeToggle toggle={{ theme, setTheme }} />
        </div>
        <h2 className="text-5xl pl-20 py-10 bg-nav-top mb-0 mt-0">
          <Link className="shadow-none text-white pl-6" to={`/`}>
            {title}
          </Link>
        </h2>
        <p className="leading-loose pl-20 pt-10 bg-nav-bottom mt-0">
          <span className="pl-6 text-blue">&nbsp;</span>
          <Link className="text-blue" to={`/`}>/</Link>
          {section && (
            <span>
              <span className="text-blue">&nbsp;</span>
              <Link
                className="text-blue"
                to={`/${kebabCase(section)}/`}
              >
                {section}
              </Link>
              <span className="text-white">&nbsp;/</span>
            </span>)}
          <span className="text-white">&nbsp;{kebabCase(page_url)}</span>
        </p>
      </BackgroundImage>
    )
  }
  return (
    <div
      className={`${theme === 'light' ? 'theme-light' : 'theme-dark'
        } bg-notion-DEFAULT-bkg text-notion-DEFAULT-txt transition-all duration-300 m-0 px-0 py-0 min-h-screen`}>
      <div className="float-none mx-auto px-5 py-0">
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
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout
