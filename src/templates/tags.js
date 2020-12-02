import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostItem from "../components/postItem"
import capitalize from "lodash/capitalize"
import sample from "lodash/sample"

class TagsTemplate extends React.Component {
  render () {
    const siteTitle = this.props.data.site.siteMetadata.title
    const { blogPosts, totalCount } = this.props.data.allPosts
    const currentTag = this.props.pageContext.tags
    const postsCounter = `${totalCount} post${totalCount === 1 ? "" : "s"
      } tagged with "${currentTag}"`
    const tags_image = sample(blogPosts).coverImg


    return (
      <Layout location={this.props.location} title={siteTitle} page_image={tags_image} page_url={currentTag}>
        <SEO title={currentTag} />
        <h1 className="text-4xl mt-8 mb-0">#{capitalize(currentTag)}</h1>
        <p className="text-sm leading-loose mb-0 ">{postsCounter}</p>
        {
          blogPosts.map(node => <PostItem data={node} />)
        }

        <Link to="/tags">View all tags</Link>
      </Layout>
    )
  }
}

export default TagsTemplate

export const pageQuery = graphql`
  query($tags: String) {
    site {
      siteMetadata {
        title
      }
    }
    allPosts(
      sort: { fields: [publish_date___startDate], order: DESC }
      filter: {  tags: { in: [$tags] } status: {eq: "published"}}
      )
      {
      totalCount
      blogPosts: nodes {
        title
        section
        tags
        desc
        content_type
        status
        url
        read_time
        cover_image
        coverImg {
          publicURL
          childImageSharp {
          fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        slug
        publish_date{
          startDate(formatString: "YYYY-MMM-DD", fromNow: false)
        }
      }
    }
  }
`
