import React from 'react';
import Img from 'gatsby-image';

const GatsbyNotionImage = ({ node, ...props }) => {

  if (node.childImageSharp && node.childImageSharp.fluid) {
    return <Img fluid={node.childImageSharp.fluid} {...props} />;
  }

  if (node.childImageSharp && node.childImageSharp.fixed) {
    return <Img fixed={node.childImageSharp.fixed} {...props} />;
  }

  return <img src={node.url} alt={node.title} {...props} />;
};

export default GatsbyNotionImage
