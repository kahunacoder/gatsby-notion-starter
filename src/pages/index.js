import React from 'react'
import { graphql } from 'gatsby'
import PostItem from "../components/postItem"
import Layout from '../components/layout'

import Bio from "../components/bio"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"



class BlogIndex extends React.Component {
  render () {
    // const { data } = this.props

    // const Blog = (props) => {
    // const siteTitle = props.data.site.siteMetadata.title
    const { data: { allPosts } } = this.props
    const { data: { site } } = this.props
    return (
      <Layout location={this.props.location} title={site.siteTitle}>
        <SEO title="All posts" />
        <Bio />
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
    allPosts(filter: {status: {eq: "published"}, content_type: {eq: "article"}}) {
      nodes {
        title
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
