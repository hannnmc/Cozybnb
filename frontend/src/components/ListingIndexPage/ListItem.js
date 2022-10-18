import React from "react";
import { useHistory } from "react-router-dom";

function ListItem({ listing, isHighlighted, setSelectedListing }) {
  const { title, photoUrl, price, averageRating } = listing;
  const history = useHistory(); 

  return (
    <div
      className={"listing-box" + (isHighlighted ? " highlighted" : "")}
      onClick={() => history.push(`/listings/${listing.id}`)}
      onMouseEnter={() => setSelectedListing(listing.id)}
      onMouseLeave={() => setSelectedListing(null)}
    >
      <div className="list-item-info">
      {photoUrl && ( <div className="listing-image-box"> <img className="listing-image" src={photoUrl} alt='Listing'/></div> )}

      <div className="text-info-box">
        <h2  className="list-item-copy">{title}</h2>
        <div className="list-item-fields">
          <div className="top-info-field">
            <span className="list-item-category">Average Rating:</span>
            <span className="list-item-review">
              {averageRating || ' No reviews yet'}
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
