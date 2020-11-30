import React from "react"
import { Link } from "gatsby"
// import { parseImageUrl } from '@conradlin/notabase/src/utils'
import Tags from "../components/tags"
import Img from "gatsby-image"

export default ({ data }) => {
  const { title, tags, coverImg, section, publish_date, desc, read_time, url } = data

  return (
    <article key={section + "/" + url}>
      <header>

        <Link
          className="text-notion-blue-txt shadow-none"
          to={"/" + section + "/" + url}
        >
          {coverImg && (
            <Img
              fluid={coverImg.childImageSharp.fluid}
              alt={`${title}`}
              style={{ height: '200px' }}
            />)}
          <h3 className="text-2xl mt-2 mb-1">{title}</h3>
        </Link>

        <div className="text-notion-gray-txt shadow-none">
          Published: {publish_date.startDate}
          <span className="float-right text-right">Read Time: ~{read_time} mins</span>
          <p><Tags listOfTags={tags} /></p>
        </div>
      </header>
      <section>
        <p
          className="mb-8 mt-2"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      </section>
    </article>
  )
}
