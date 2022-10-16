import React from "react";
import { useHistory } from "react-router-dom";

function ListItem({ listing, isHighlighted, setHighlightedListing }) {
  const { title, photoUrl, price, averageRating } = listing;
  const history = useHistory(); 

  return (
    <div
      className={"list-item" + (isHighlighted ? " highlighted" : "")}
      onClick={() => history.push(`/listings/${listing.id}`)}
      onMouseEnter={() => setHighlightedListing(listing.id)}
      onMouseLeave={() => setHighlightedListing(null)}
    >
      <div className="list-item-info">
      {photoUrl && <div className="listing-image-box"> <img className="listing-image" src={photoUrl} alt='Listing'/></div>}

      <div className="text-info-box">
        <h2>{title}</h2>
        <div className="list-item-fields">
          <div className="info-field">
            <span className="list-item-category">Average Rating:</span>
            <span className="list-item-copy">
              {averageRating || 'No reviews yet'}
            </span>
          </div>
          <div className="info-field">
            <span className="list-item-category">Price:</span>
            <span className="list-item-copy">${price}</span>
          </div>
        </div>
      </div>

        
      </div>
    </div>
  );
}

export default ListItem;
