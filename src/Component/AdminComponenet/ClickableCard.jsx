import React from "react";
import { Link } from "react-router-dom";

const ClickableCard = ({ url, text, imageSrc ,ficon}) => {
  return (
    <div className="col-md-4 ">
      <div className="clickable-card-container ">
        <Link to={url}  className="clickable-card">
          <div className="card-content">
            {ficon && <i className={`${ficon} profile-image rem-two`}></i>}
            {imageSrc && <img src={imageSrc} alt="Profile" className="profile-image" />}
            
            <p className="card-text">{text}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ClickableCard;
