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
      limit: 2000,
      filter: { status: {eq: "published"}, content_type: {eq: "article"}},
      sort: { fields: [publish_date___startDate], order: DESC }
    ) {
      nodes {
        title
        section
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
