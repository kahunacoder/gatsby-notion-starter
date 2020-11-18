import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

class TagsTemplate extends React.Component {
  render () {
    const siteTitle = this.props.data.site.siteMetadata.title
    // const { posts: { title, tags, url } } = this.props.data
    // const { data: { allPosts } } = this.props

    const { blogPosts, totalCount } = this.props.data.allPosts
    console.log(blogPosts)
    const currentTag = this.props.pageContext.tag
    const postsCounter = `${totalCount} post${totalCount === 1 ? "" : "s"
      } tagged with "${currentTag}"`


    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={currentTag} />
        <Bio />
        <h1>Tag: {currentTag}</h1>
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
        <Link to="/tags">View all tags</Link>
      </Layout>
    )
  }
}

export default TagsTemplate

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allPosts(
      sort: { fields: [publish_date___startDate], order: DESC }
      filter: {  tags: { in: [$tag] } }
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
