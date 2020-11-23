import React from 'react'
import { Link, graphql } from "gatsby"
import Layout from '../components/layout'
import { parseImageUrl } from '@conradlin/notabase/src/utils'

import Bio from "../components/bio"
import SEO from "../components/seo"
import NotionNav from "../components/NotionNav"
import findIndex from "lodash/findIndex"

import { rhythm, scale } from "../utils/typography"

class BlogPostTemplate extends React.Component {
  render () {
    const siteTitle = this.props.data.site.siteMetadata.title
    const { posts: { title, category, tags, publish_date, html, url, slug, desc, color, related } } = this.props.data
    const index = findIndex(related, function (o) { return o.url == url })
    const previous = index === related.length - 1 ? null : related[index + 1]
    const next = index === 0 ? null : related[index - 1]

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
      category
      publish_date{
        startDate(formatString: "YYYY-MMM-DD", fromNow: false)
      }
      url
      desc
      color
      cover_image
      related{
        title
        category
        url
      }
    }
  }
`
