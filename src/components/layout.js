import React, { useContext } from 'react';
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import capitalize from "lodash/capitalize"
import PropTypes from 'prop-types';
import { ThemeContext } from '../context/themeContext';
import BackgroundImage from 'gatsby-background-image-es5'

// import { rhythm, scale } from "../utils/typography"


const Layout = (props) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const { location, title, section, children, page_image, page_url } = props
  const rootPath = `${__PATH_PREFIX__}/`
  let header
  let breadcrumbs
  const handleThemeToggle = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  if (location.pathname === rootPath) {
    header = (
      <div>
        <div className="float-right text-alignright pr-5 py-0">
          <div className="dark-button">
            <input
              type="checkbox"
              id="theme-toggle"
              onChange={handleThemeToggle}
              checked={theme === 'dark' ? true : false}
            /> Dark Mode &nbsp;
          <label for="theme-toggle"></label>
          </div>
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
          <div className="dark-button text-white">
            <input
              type="checkbox"
              id="theme-toggle"
              onChange={handleThemeToggle}
              checked={theme === 'dark' ? true : false}
            />
            Dark Mode &nbsp;
            <label for="theme-toggle"></label>
          </div>
        </div>
        <h2 className="text-5xl pl-20 py-10 bg-nav-top mb-0 mt-0">
          <Link className="shadow-none text-white pl-6" to={`/`}>
            {title}
          </Link>
        </h2>
        <p className="leading-loose pl-20 pt-10 bg-nav-bottom mt-0">
          <span className="pl-6 text-white">&nbsp;</span>
          <Link className="text-white" to={`/`}>/</Link>
          <span className="text-white">&nbsp;::&nbsp;</span>
          <Link
            className="text-white"
            to={`/${kebabCase(section)}/`}
          >
            {section}
          </Link>
          <span className="text-white">&nbsp;::&nbsp;</span>
          <span className="text-gray">/{page_url}</span>
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
