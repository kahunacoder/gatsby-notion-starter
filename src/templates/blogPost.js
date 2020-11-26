import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/layout'
// import { parseImageUrl } from '@conradlin/notabase/src/utils'
import Tags from "../components/tags"

import Bio from "../components/bio"
import SEO from "../components/seo"
import NotionNav from "../components/NotionNav"
import findIndex from "lodash/findIndex"
// import capitalize from "lodash/capitalize"

// import { rhythm, scale } from "../utils/typography"

class BlogPostTemplate extends React.Component {
  render () {
    const siteTitle = this.props.data.site.siteMetadata.title
    const { posts: { title, section, tags, publish_date, html, url, desc, toc, read_time } } = this.props.data
    const index = findIndex(toc, function (o) { return o.url === url })
    const previous = index === toc.length - 1 ? null : toc[index + 1]
    const next = index === 0 ? null : toc[index - 1]

    return (
      <Layout location={this.props.location} title={siteTitle} section={section}>
        <SEO
          title={title}
          description={desc}
        />
        <article>
          <header>
            <h1 className="text-5xl text-notion-DEFAULT-txt mt-4 mb-0">
              {title}
            </h1>
            <p className="text-sm leading-loose mb-4 ">
              <strong>Published:</strong> {publish_date.startDate}
              <span className="float-right text-right">Read Time: ~{read_time} mins</span>
              <Tags listOfTags={tags} />
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
      tags
      section
      read_time
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
