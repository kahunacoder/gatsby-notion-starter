import React from 'react'
import { graphql } from 'gatsby'
import PostItem from "../components/postItem"
import Layout from '../components/layout'

import SEO from "../components/seo"
// import { rhythm } from "../utils/typography"
class BlogIndex extends React.Component {
  render () {
    const { data: { allPosts } } = this.props
    const { data: { site } } = this.props
    return (
      <Layout location={this.props.location} title={site.siteMetadata.title}>
        <SEO title="All posts" />
        {
          allPosts.nodes.map(node => <PostItem data={node} />)
        }
      </Layout>
    )
  }
}

export default BlogIndex

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allPosts(
      filter: { status: {eq: "published"}},
      sort: { fields: [publish_date___startDate], order: DESC }
    ) {
      nodes {
        title
        section
        tags
        desc
        content_type
        cover_image
        status
        url
        read_time
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
