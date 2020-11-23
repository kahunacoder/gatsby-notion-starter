import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import capitalize from "lodash/capitalize"
import orderBy from "lodash/orderBy"

// import kebabCase from "lodash/kebabCase"

class CatPage extends React.Component {
  render () {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const pageTitle = "Sections"
    let sections = data.sectionsGroup.group
    sections = orderBy(sections, ['totalCount'], ['desc']);

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={pageTitle} />

        <h2 className="text-4xl font-sans font-black mt-0 mb-0">{pageTitle}</h2>
        <hr className="h-px mb-4 mt-4" />
        <ul>
          {sections.map(section => (
            <li key={section.fieldValue}>
              <Link to={"/" + section.fieldValue}>
                {capitalize(section.fieldValue)} ({section.totalCount})
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
    sectionsGroup: allPosts(
      limit: 2000
      filter: {status: {eq: "published"}, content_type: {eq: "article"}}
    )
    {
      group(field: section) {
        fieldValue
        totalCount
        nodes {
          title
          url
          section
        }
      }
    }
  }
`
