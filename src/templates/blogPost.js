import React from 'react'
import { Link, graphql } from "gatsby"
import Layout from '../components/layout'
import { parseImageUrl } from '@conradlin/notabase/src/utils'

import Bio from "../components/bio"
import SEO from "../components/seo"
import NotionNav from "../components/NotionNav"

import { rhythm, scale } from "../utils/typography"

class BlogPostTemplate extends React.Component {
  render () {
    const { posts: { title, tags, publish_date, html, url, slug, desc, color } } = this.props.data
    const siteTitle = this.props.data.site.siteMetadata.title
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={title}
          description={desc}
        />
        <article>
          <header>
            <h1 className="text-5xl font-black mt-8 mb-0">
              {title}
            </h1>
            <p className="text-sm leading-loose mb-8 ">
              {publish_date.startDate} #
              <Link
                className="text-blue-600"
                to={"/posts/" + tags}
              >
                {tags}
              </Link>
            </p>
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <hr className="h-px mb-8" />
          <footer>
            <Bio />
          </footer>
        </article>
        <NotionNav pageNav={this.props.pageContext} />
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
      tags
      publish_date{
        startDate(formatString: "YYYY-MMM-DD", fromNow: false)
      }
      url
      desc
      color
      cover_image
    }
  }
`
