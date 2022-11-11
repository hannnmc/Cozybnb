import React from "react";
import { useHistory } from "react-router-dom";

function ListItem({ listing, isHighlighted, setSelectedListing }) {

  const { title, photoUrls, price, averageRating, beds, description } = listing;
  const history = useHistory(); 

  return (
    <div
      className={"listing-box" + (isHighlighted ? " highlighted" : "")}
      onClick={() => history.push(`/listings/${listing.id}`)}
      onMouseEnter={() => setSelectedListing(listing.id)}
      onMouseLeave={() => setSelectedListing(null)}
    >
      <div className="list-item-info">
      {photoUrls && ( <div className="listing-image-box"> <img className="listing-image" src={photoUrls[0]} alt='loading...'/></div> )}

      <div className="text-info-box">
        <h2  className="list-item-copy">{title}</h2>
        <div className="list-item-fields">
          <div className="top-info-field">
            {/* <span className="list-item-category">Average Rating:</span>
            <span className="list-item-review">
              {averageRating || ' No reviews yet'}
            </span> */}
            <span>{description.split(' ').slice(0,5).join(' ')}</span>
            <span className="description-dots">...</span>
          </div>
          <div className="list-item-beds-container">
            <span className="list-item-beds">
              {beds} beds
            </span>
          </div>
          <div className="bot-info-field">
            <span className="list-item-copy">${price}</span>
            <span className="list-item-category"> night</span>
          </div>
        </div>
      </div>

        
      </div>
    </div>
  );
}

export default ListItem;
