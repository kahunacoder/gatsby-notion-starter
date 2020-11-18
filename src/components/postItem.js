import React from "react"
import { Link } from "gatsby"
import { parseImageUrl } from '@conradlin/notabase/src/utils'

export default ({ data }) => {
  const { title, tags, cover_image, category, publish_date, desc, read_time, url, slug } = data
  let coverimageURL = parseImageUrl(cover_image[0], 1000, slug)

  return (
    <article key={category + "/" + url}>
      <header>
        <h3 className="text-2xl font-black mt-16 mb-2">
          <Link
            className="text-blue-600 shadow-none"
            to={"/" + category + "/" + url}
          >
            {title}
          </Link>
        </h3>
        <small>{"/" + category + "/" + url}</small>
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