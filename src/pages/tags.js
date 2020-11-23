import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import capitalize from "lodash/capitalize"
import kebabCase from "lodash/kebabCase"

class TagsPage extends React.Component {
  render () {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const pageTitle = "Tags"
    const tags = data.tagsGroup.group

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={pageTitle} />
        <h2 className="text-4xl font-sans font-black mt-0 mb-0">{pageTitle}</h2>
        <hr className="h-px mb-4 mt-4" />
        <ul>
          {tags.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={"/tags/" + kebabCase(tag.fieldValue)}>
                {capitalize(tag.fieldValue)} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    tagsGroup: allPosts(limit: 2000) {
      group(field: tags) {
        fieldValue
        totalCount
        nodes {
          title
          url
          category
        }
      }
    }
  }
`
