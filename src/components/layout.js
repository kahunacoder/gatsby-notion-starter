import React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import capitalize from "lodash/capitalize"
import DarkToggle from './DarkToggle';
import PropTypes from 'prop-types';

// import { rhythm, scale } from "../utils/typography"
class Layout extends React.Component {
  render () {
    const { location, title, children, section } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header
    let breadcrumbs

    if (location.pathname === rootPath) {
      header = (
        <div>
          <h1 className="text-6xl font-black font-sans mb-10 mt-0">
            <Link className="shadow-none" to={`/`}>
              {title}
            </Link>
            <DarkToggle />
          </h1>
        </div>
      )
    } else {
      header = (
        <div>
          <h3 className="text-2xl font-sans font-black mt-0">
            <Link className="shadow-none" to={`/`}>
              {title}
            </Link>
            <DarkToggle />
          </h3>
        </div>
      )
    }
    if (location.pathname !== rootPath) {
      breadcrumbs = (
        <p className="text-sm leading-loose mb-8 ">
          <Link
            className="text-blue-600"
            to={`/${kebabCase(section)}/`}
          >
            {capitalize(section)}
          </Link>
        </p>)
    }
    return (
      <div className="max-w-2xl mx-auto px-5 py-10">
        <header>{header}</header>
        <main>{breadcrumbs}{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a className="text-blue-600" href="https://www.gatsbyjs.org">
            Gatsby
          </a>
        </footer>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout
