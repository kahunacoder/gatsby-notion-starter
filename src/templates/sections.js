import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostItem from "../components/postItem"
import capitalize from "lodash/capitalize"
import sample from "lodash/sample"

class SectionsTemplate extends React.Component {
  render () {
    const siteTitle = this.props.data.site.siteMetadata.title
    const { blogPosts, totalCount } = this.props.data.allPosts
    const currentSection = this.props.pageContext.section
    const postsCounter = `${totalCount} Article${totalCount === 1 ? "" : "s"
      } in the "${currentSection}" section`


    let section_image = sample(blogPosts).coverImg
    // if (section_image.childImageSharp) {
    //   section_image = section_image.childImageSharp.fluid
    // }
    // else {
    //   section_image = section_image.publicURL
    // }


    return (
      <Layout location={this.props.location} title={siteTitle} page_image={section_image} page_url={currentSection}>
        <SEO title={currentSection} />
        <h1 className="text-4xl mt-8 mb-0">{capitalize(currentSection)}</h1>
        <p className="text-sm leading-loose mb-0 ">{postsCounter}</p>
        {
          blogPosts.map(node => <PostItem data={node} key={node.url} />)
        }
        <Link to="/sections">View all sections</Link>
      </Layout >
    )
  }
}

export default SectionsTemplate

export const pageQuery = graphql`
  query($section: String) {
    site {
      siteMetadata {
        title
      }
    }
    allPosts(
      sort: { fields: [publish_date___startDate], order: DESC }
      filter: {  section: { in: [$section] } status: {eq: "published"}}
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
          fluid(maxHeight: 200) {
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
