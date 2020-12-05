import React from "react"
import { Link } from "gatsby"
import GatsbyNotionImage from './GatsbyNotionImage'
import PostDetails from './PostDetails'

export default ({ data }) => {
  const { title, coverImg, section, desc, url } = data

  return (
    <article key={url}>
      <header className="mt-2 mb-1">
        <Link
          className="text-notion-blue-txt shadow-none"
          to={"/" + section + "/" + url}
        >
          <GatsbyNotionImage
            node={coverImg}
            alt={title}
            className="mb-0"
            style={{ maxHeight: '200px', minWidth: '100%' }}
          />
          <h3 className="text-2xl mt-1">{title}</h3>

        </Link>
      </header>
      <section>
        <PostDetails node={data} />
        <p
          className="mb-8 mt-2"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      </section>
    </article>
  )
}
