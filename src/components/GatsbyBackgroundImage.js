import React from 'react';
import BackgroundImage from 'gatsby-background-image-es5'

export default ({ node, ...props }) => {
  // console.log(node)
  // if (node.childImageSharp && node.childImageSharp.fluid) {
  //   return <BackgroundImage fluid={node.childImageSharp.fluid} {...props} />;
  // }

  // if (node.childImageSharp && node.childImageSharp.fixed) {
  //   return <BackgroundImage fixed={node.childImageSharp.fixed} {...props} />;
  // }

  return <BackgroundImage src={node.publicURL} {...props} />;
};
