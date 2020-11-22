import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostItem from "../components/postItem"

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

        {
          blogPosts.map(node => <PostItem data={node} />)
        }

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
        category
        tags
        desc
        content_type
        status
        url
        read_time
        cover_image
        slug
        publish_date{
          startDate(formatString: "YYYY-MMM-DD", fromNow: false)
        }
      }
    }
  }
`
