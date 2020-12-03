import React from "react"
import { Link } from "gatsby"
import GatsbyNotionImage from './GatsbyNotionImage'
import PostDetails from './PostDetails'

export default ({ data }) => {
  const { title, coverImg, section, desc, url } = data

  return (
    <article key={section + "/" + url}>
      <header>
        <Link
          className="text-notion-blue-txt shadow-none"
          to={"/" + section + "/" + url}
        >
          <GatsbyNotionImage
            node={coverImg}
            alt={title}
            style={{ minWidth: '100%', maxHeight: '200px' }}
          />
          <h3 className="text-2xl mt-2 mb-1">{title}</h3>
        </Link>
        <PostDetails node={data} />
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
