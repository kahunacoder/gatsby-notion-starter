import React from 'react'
import { graphql } from 'gatsby'
import PostItem from "../components/postItem"
import Layout from '../components/layout'

import Bio from "../components/bio"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"




const Blog = (props) => {
  const { data: { allPosts } } = props
  return (
    <Layout>
      <SEO title="All posts" />
      <Bio />
      {
        allPosts.nodes.map(node => <PostItem data={node} />)
      }
    </Layout>
  )
}

export default Blog
export const query = graphql`
  query {
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
