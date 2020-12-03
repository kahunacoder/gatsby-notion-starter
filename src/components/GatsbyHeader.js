import React, { Link } from 'react';
import GatsbyBackgroundImage from './GatsbyBackgroundImage'

// export default ({ gbHeader }) => {
const GatsbyHeader = ({ gbHeader, ...props }) => {
  const page_image = gbHeader.page_image
  const title = gbHeader.title

  return (
    <div>
      <GatsbyBackgroundImage
        Tag="div"
        id="siteHeader"
        className="bg-header bg-nav-top"
        node={page_image}
        style={{ height: '400px' }}
      >
        <div className="bg-nav-top" style={{ height: '400px' }}>
          <h2 className="text-5xl max-w-5xl mx-auto px-5 py-0 ">
            <Link className="leading-loose shadow-none text-white" to={`/`}>
              {title}
            </Link>
          </h2>
        </div>
      </GatsbyBackgroundImage >
    </div>
  );
};

export default GatsbyHeader
