import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

class CategoriesTemplate extends React.Component {
  render () {
    const siteTitle = this.props.data.site.siteMetadata.title
    const { blogPosts, totalCount } = this.props.data.allPosts
    const currentCategory = this.props.pageContext.category
    const postsCounter = `${totalCount} post${totalCount === 1 ? "" : "s"
      } tagged with "${currentCategory}"`


    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={currentCategory} />
        <Bio />
        <h1>Category: {currentCategory}</h1>
        <p>{postsCounter}</p>
        <ul>
          {blogPosts.map(item => {
            console.log(item)
            const url = "/" + item.category + "/" + item.url
            const title = item.title
            return (
              <li key={url}>
                <Link to={url}>{title}</Link>
              </li>
            )
          })}
        </ul>
        <Link to="/categories">View all categories</Link>
      </Layout>
    )
  }
}

export default CategoriesTemplate

export const pageQuery = graphql`
  query($category: String) {
    site {
      siteMetadata {
        title
      }
    }
    allPosts(
      sort: { fields: [publish_date___startDate], order: DESC }
      filter: {  category: { in: [$category] } }
      )
      {
      totalCount
      blogPosts: nodes {
        title
        url
        category
      }
    }
  }
`
// allPosts(
//       limit: 2000
//       sort: { fields: [publish_date___startDate], order: DESC }
//       filter: {  tags: { in: [$tag] } }
//     ) {
//       totalCount
//       }
//     }
