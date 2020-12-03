import React from 'react';
import Tags from "../components/tags"
import kebabCase from "lodash/kebabCase"
import { useStaticQuery, graphql, Link } from "gatsby"

const PostDetails = ({ node, ...props }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  )

  return (
    <p className="px-2 text-sm leading-loose mb-4 bg-notion-gray-bkg">
      <strong className="text-notion-green-txt">Published:</strong> {node.publish_date.startDate}
      <span className="float-right text-right"><strong className="text-notion-green-txt">Read Time:</strong> ~{node.read_time} mins</span>
      <br></br>
      <span className="leading-loose">
        <strong className="text-notion-green-txt">Url:</strong>
        <span className="text-notion-blue-txt">&nbsp;</span>
        <Link className="text-notion-blue-txt" to={`/`}>{site.siteMetadata.siteUrl}/</Link>
        {node.section && (
          <span>
            <Link
              className="text-notion-blue-txt"
              to={`/${kebabCase(node.section)}/`}
            >
              {node.section}
            </Link>
          </span>)}
        <span className="text-notion-DEFAULT-txt">
          <Link
            className="text-notion-DEFAULT-txt"
            to={`/${kebabCase(node.section)}/${kebabCase(node.url)}`}
          >
            /{kebabCase(node.url)}
          </Link>
        </span>
      </span>
      <Tags listOfTags={node.tags} />
    </p>
  )
};

export default PostDetails
