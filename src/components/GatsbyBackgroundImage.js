import React from 'react';
import BackgroundImage from 'gatsby-background-image-es5'

const GatsbyBackgroundImage = ({ node, ...props }) => {
  if (node.childImageSharp && node.childImageSharp.fluid) {
    return <BackgroundImage fluid={node.childImageSharp.fluid} style={{ backgroundAttachment: 'fixed' }} {...props} />;
  }

  if (node.childImageSharp && node.childImageSharp.fixed) {
    return <BackgroundImage fixed={node.childImageSharp.fixed} style={{ backgroundAttachment: 'fixed' }} {...props} />;
  }

  return <div style={{ backgroundImage: `url(` + node.url + `)` }} {...props} />;
};

export default GatsbyBackgroundImage