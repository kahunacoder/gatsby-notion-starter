import React from "react"
import { Link } from "gatsby"
import { parseImageUrl } from '@conradlin/notabase/src/utils'

export default ({ data }) => {
  const { title, tags, cover_image, section, publish_date, desc, read_time, url, slug } = data
  let coverimageURL = parseImageUrl(cover_image[0], 1000, slug)

  return (
    <article key={section + "/" + url}>
      <header>
        <h3 className="text-2xl font-black mt-8 mb-2">
          <Link
            className="text-blue-600 shadow-none"
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
        <div style={{ color: "grey" }}>
          Published: {publish_date.startDate}
          <br></br>Read Time: {read_time} mins
          <br></br>Tags: {tags && tags.join(', ')}
        </div>
      </header>
      <section>
        <p
          className="mb-8"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      </section>
    </article>
  )
}
