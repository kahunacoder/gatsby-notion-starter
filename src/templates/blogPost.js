import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { parseImageUrl } from '@conradlin/notabase/src/utils'

import Bio from "../components/bio"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

export default ({ data }) => {
  const { posts: { title, tags, publish_date, html, url, slug, desc, color, cover_image } } = data

  return (
    <Layout>
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
            {publish_date.startDate}
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
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
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
