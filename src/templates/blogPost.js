import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/layout'
import PostDetails from '../components/PostDetails'
import Bio from "../components/bio"
import SEO from "../components/seo"
import NotionNav from "../components/NotionNav"
import findIndex from "lodash/findIndex"

class BlogPostTemplate extends React.Component {
  render () {
    const siteTitle = this.props.data.site.siteMetadata.title
    const { posts: { title, coverImg, section, html, url, desc, toc } } = this.props.data
    // PageNav
    const index = findIndex(toc, function (o) { return o.url === url })
    const previous = index === toc.length - 1 ? null : toc[index + 1]
    const next = index === 0 ? null : toc[index - 1]

    return (
      <Layout location={this.props.location} title={siteTitle} section={section} page_image={coverImg} page_url={url}>
        <SEO
          title={title}
          description={desc}
        />
        <article>
          <header>
            <h1 className="text-5xl text-notion-DEFAULT-txt mt-4 mb-1">
              {title}
            </h1>
            <PostDetails node={this.props.data.posts} />
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <hr className="h-px mb-8" />
          <footer>
            <Bio />
          </footer>
        </article>
        <NotionNav pageNav={{ previous, next }} />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    posts(slug: { eq: $slug }) {
      html
      title
      slug
      tags
      section
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
      publish_date{
        startDate(formatString: "MMMM Do YYYY", fromNow: false)
      }
      url
      toc{
        title
        section
        url
        publish_date{
          startDate(formatString: "MMMM Do YYYY", fromNow: false)
        }
      }
    }
  }
`
