import React from 'react';
import BackgroundImage from 'gatsby-background-image-es5'

const GatsbyBackgroundImage = ({ node, ...props }) => {
  // console.log(node)
  if (node.childImageSharp && node.childImageSharp.fluid) {
    return <BackgroundImage fluid={node.childImageSharp.fluid} {...props} />;
  }

  if (node.childImageSharp && node.childImageSharp.fixed) {
    return <BackgroundImage fixed={node.childImageSharp.fixed} {...props} />;
  }

  return <div style={{ backgroundImage: `url(` + node.publicURL + `)` }} {...props} />;
};
// src={node.publicURL}
export default GatsbyBackgroundImage