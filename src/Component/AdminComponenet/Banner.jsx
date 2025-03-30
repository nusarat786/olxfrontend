import React from 'react';

const Banner = ({ bannerHeading, imageUrl,fasSrc }) => {
  return (
    <div className="container mt-1">
      <div className="row">
        <div className="col-md-12">
          <div className="banner-card">
            {/* Left Side: Heading */}
            <div className="welcome-msg-container">
              <h2 className="font-h1 mt-5">{bannerHeading}</h2>
            </div>

            {/* Right Side: Image */}
            <div>
              {imageUrl && (
                <img src={imageUrl} alt="banner" className="banner-image" />
              )}

              {fasSrc && (
                <figure className="banner-image margin-5" >
                  <i className={`${fasSrc} rem-ten`}></i>
                </figure>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;