import React from "react";

function ListItem({ listing, isHighlighted, setHighlightedListing }) {
  const { title, photoUrl, price, averageRating } = listing;

  return (
    <div
      className={"listing-box" + (isHighlighted ? " highlighted" : "")}
      onClick={() => setHighlightedListing(listing.id)}
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
