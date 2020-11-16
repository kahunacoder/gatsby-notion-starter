import React from "react"
import { Link } from "gatsby"

// import { rhythm, scale } from "../utils/typography"


class NotionNav extends React.Component {
  render () {
    const { previous, next } = this.props.pageNav
    return (
      <nav>
        <ul
          className="flex flex-wrap justify-between mb-8"
        >
          <li>
            {previous && (
              <Link
                className="text-blue-600"
                to={"/posts/" + previous.url}
                rel="prev"
              >
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link
                className="text-blue-600"
                to={"/posts/" + next.url}
                rel="next"
              >
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    )
  }
}

export default NotionNav
