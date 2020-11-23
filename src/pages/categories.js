import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

// import kebabCase from "lodash/kebabCase"

class CatPage extends React.Component {
  render () {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const pageTitle = "Categories"
    const categories = data.categoriesGroup.group

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={pageTitle} />
        <Bio />

        <h1>{pageTitle}</h1>

        <ul>
          {categories.map(category => (
            <li key={category.fieldValue}>
              <Link to={`/$(category.fieldValue)/`}>
                {category.fieldValue} ({category.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export default CatPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    categoriesGroup: allPosts(limit: 2000) {
      group(field: category) {
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
