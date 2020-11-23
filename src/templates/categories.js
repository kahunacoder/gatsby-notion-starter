import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostItem from "../components/postItem"
import capitalize from "lodash/capitalize"

class CategoriesTemplate extends React.Component {
  render () {
    const siteTitle = this.props.data.site.siteMetadata.title
    const { blogPosts, totalCount } = this.props.data.allPosts
    const currentCategory = this.props.pageContext.category
    const postsCounter = `${totalCount} Article${totalCount === 1 ? "" : "s"
      } in the "${currentCategory}" section`


    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={currentCategory} />
        <Bio />
        <h1 className="text-5xl font-sans font-black mt-8 mb-0">{capitalize(currentCategory)}</h1>
        <p className="text-sm leading-loose mb-0 ">{postsCounter}</p>
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
