import React from "react"
import { Link } from "gatsby"
import { parseImageUrl } from '@conradlin/notabase/src/utils'
import Tags from "../components/tags"

export default ({ data }) => {
  const { title, tags, cover_image, section, publish_date, desc, read_time, url, slug } = data
  let coverimageURL = parseImageUrl(cover_image[0], 1000, slug)

  return (
    <article key={section + "/" + url}>
      <header>
        <h3 className="text-2xl font-black mt-8 mb-2">
          <Link
            className="text-notion-blue-txt shadow-none"
            to={"/" + section + "/" + url}
          >
            <img
              alt={`${title}`}
              style={{ width: '100%' }}
              src={coverimageURL}
            />
            {title}
          </Link>
        </h3>
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
