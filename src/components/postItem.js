import React from "react"
import { Link } from "gatsby"
import { parseImageUrl } from '@conradlin/notabase/src/utils'

export default ({ data }) => {
  const { title, tags, cover_image, publish_date, desc, read_time, url, slug } = data
  let coverimageURL = parseImageUrl(cover_image[0], 1000, slug)

  return (
    // <div style={{ margin: 10 }}>
    //   <Link to={`posts/${url}/`}>
    //     <img
    //       alt={`${title} cover image`}
    //       style={{ width: '100%' }}
    //       src={coverimageURL}
    //     />
    //     <div style={{ color: "grey" }}>Tags: {tags && tags.join(', ')} • Published: {publish_date.startDate} • {read_time} MIN READ</div>
    //     <h2>{title}</h2>
    //     <p style={{ color: "black" }} dangerouslySetInnerHTML={{ __html: desc }}></p>
    //   </Link>
    // </div>
    <article key={`posts/${url}/`}>
      <header>
        <h3 className="text-2xl font-black mt-16 mb-2">
          <Link
            className="text-blue-600 shadow-none"
            to={`posts/${url}/`}
          >
            {title}
          </Link>
        </h3>
        <small>{`posts/${url}/`}</small>
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
