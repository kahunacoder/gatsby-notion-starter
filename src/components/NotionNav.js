import React from "react"
import { Link } from "gatsby"

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
                className="text-notion-blue-txt"
                to={"/" + previous.section + "/" + previous.url}
                rel="prev"
              >
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link
                className="text-notion-blue-txt"
                to={"/" + next.section + "/" + next.url}
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
