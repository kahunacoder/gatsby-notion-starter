import React from 'react';
import GatsbyImage from 'gatsby-image';

const GatsbyNotionImage = ({ node, ...props }) => {
  if (node.childImageSharp && node.childImageSharp.fluid) {
    return <GatsbyImage fluid={node.childImageSharp.fluid} {...props} />;
  }

  if (node.childImageSharp && node.childImageSharp.fixed) {
    return <GatsbyImage fixed={node.childImageSharp.fixed} {...props} />;
  }

  return <img src={node.publicURL} {...props} />;
};

export default GatsbyNotionImage