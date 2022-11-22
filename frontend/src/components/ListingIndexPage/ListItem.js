import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ListItem({ listing, isHighlighted, setSelectedListing }) {

  const { title, photoUrls, price, averageRating, beds, description } = listing;
  const history = useHistory(); 
  const reviews = useSelector(state => Object.values(state.reviews));
  const listingReview = reviews.filter(review =>
      review.listingId === parseInt(listing.id));

  let avgListingReview = 0;

  if (listingReview.length > 0) {
      listingReview.forEach(review => {
          avgListingReview += review.rating;
      })
      avgListingReview = avgListingReview/listingReview.length
  }

  return (
    <div
      className={"listing-box" + (isHighlighted ? " highlighted" : "")}
      onClick={() => history.push(`/listings/${listing.id}`)}
      onMouseEnter={() => setSelectedListing(listing.id)}
      onMouseLeave={() => setSelectedListing(null)}
    >
      <div className="list-item-info">
      {photoUrls[0] ? ( <div className="listing-image-box"> 
      <img className="listing-image" src={photoUrls[0]} alt='loading...'/></div> ) : <div className="listing-image-box">
        <img src='https://thecozybnb-dev.s3.amazonaws.com/default_property_image.svg' className="listing-image" /></div>}

      <div className="text-info-box">
        <div className="listing-box-title">
          <h2  className="list-item-title">{title}</h2>
          <span>
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height='12px' width='12px' ><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fill-rule="evenodd"></path></svg>
            {` ${avgListingReview > 0 ? avgListingReview : 'New'}`}</span>
        </div>
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
