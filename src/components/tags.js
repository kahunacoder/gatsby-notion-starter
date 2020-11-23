import React from "react"
import { Link } from "gatsby"

import kebabCase from "lodash/kebabCase"

const Tags = props => {
  // If the current post does not have any tags then stop rendering the component.
  if (!props.listOfTags.length) {
    return null
  }
  // Display a list of tags for the current blog post.
  return (
    <p>
      <small>
        <strong>Tags:</strong>{" "}
        {props.listOfTags.map((tag, i) => [
          i > 0 && ", ",
          <span>#<Link to={`/tags/${kebabCase(tag)}/`} key={i}>{tag}</Link></span>
        ])}
      </small>
    </p>
  )
}

export default Tags
