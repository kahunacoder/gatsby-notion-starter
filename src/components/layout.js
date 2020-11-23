import React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import capitalize from "lodash/capitalize"

import { rhythm, scale } from "../utils/typography"
class Layout extends React.Component {
  render () {
    const { location, title, children, category } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header
    let breadcrumbs

    if (location.pathname === rootPath) {
      header = (
        <h1 className="text-6xl font-black font-sans mb-10 mt-0">
          <Link className="shadow-none" to={`/`}>
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3 className="text-2xl font-sans font-black mt-0">
          <Link className="shadow-none" to={`/`}>
            {title}
          </Link>
        </h3>
      )
    }
    if (location.pathname !== rootPath) {
      breadcrumbs = (
        <p className="text-sm leading-loose mb-8 ">
          <Link
            className="text-blue-600"
            to={`/${kebabCase(category)}/`}
          >
            {capitalize(category)}
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

export default Layout
