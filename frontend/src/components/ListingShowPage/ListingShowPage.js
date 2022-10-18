import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ListingMap from '../ListingMap';
// import ReviewForm from './ReviewForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListing } from '../../store/listings';
// import { destroyReview, getListingReviews } from '../../store/reviews';
import './ListingShowPage.css';

function ListingShowPage() {
  const dispatch = useDispatch();
  const { listingId } = useParams();

  const sessionUser = useSelector(state => state.session.user);
  const listing = useSelector(state => state.listings[listingId]);
//   const reviews = useSelector(getListingReviews(parseInt(listingId)));

  useEffect(() => {
    dispatch(fetchListing(listingId));
  }, [listingId, dispatch]);

  if (!listing) {
    return null;
  }

  const { description, guests, lat, lng, averageRating, photoUrl } = listing;
//   const hasReviewed = sessionUser && reviews.some(review => review.authorId === sessionUser.id);
  
  return (
    <div className="listing-show">
      <div className="listing-show-header">
        <h1>{listing.title}</h1>
        {/* <Link to="/">Back to Listings Index</Link> */}
        <span>{averageRating || 'No reviews yet'}</span>
        <span>{`${listing.city}, ${listing.state}, ${listing.country}`}</span>
      </div>
      <div className="listing-show-visuals">
        <div className='first-col-photo'>
            {photoUrl && <img src={photoUrl} alt='Listing' className="listing-show-image-main"/>}
        </div>
        <div className='second-col-photos'>
            {photoUrl && <img src={photoUrl} alt='Listing' className="listing-show-image"/>}
            {photoUrl && <img src={photoUrl} alt='Listing' className="listing-show-image"/>}
        </div>
        <div className='third-col-photos'>
            {photoUrl && <img src={photoUrl} alt='Listing' className="listing-show-image"/>}
            {photoUrl && <img src={photoUrl} alt='Listing' className="listing-show-image"/>}
        </div>
      </div>
      <section className="listing-show-section listing-details">
        <h2>Details</h2>
        <p>
          {description}
        </p>
        <ul>
          <li><span className='info-category'>Guests: </span>{guests}</li>
          <li><span className='info-category'>Latitude: </span>{lat}</li>
          <li><span className='info-category'>Longitude: </span>{lng}</li>
        </ul>
      </section>
      <section className="listing-show-section">
        <h2>Reviews</h2>
        <span className="average-rating">
          Average Rating: {averageRating || 'No reviews yet'}
        </span>
        <div className="reviews">
          {/* {reviews.map(review => (
            <div className="review" key={review.id}>
              <h3>Rating: {review.rating}</h3>
              <span>{review.author}</span>
              <p>{review.body}</p>
              {review.authorId === sessionUser?.id && (
                <button 
                //   onClick={() => dispatch(destroyReview(review.id))} 
                  className='delete-icon'
                >
                  <i className="fa-solid fa-rectangle-xmark" />
              </button>
              )}
            </div>
          ))} */}
        </div>
        {/* {!hasReviewed && <LeaveReview listing={listing} />} */}
      </section>
      <section className='map-section'>
      <div className='show-map'>
        <ListingMap
          listings={[listing]}
          mapOptions={{ center: { lat: listing.lat, lng: listing.lng }, zoom: 17}}
        />
        </div>
      </section>
    </div>
  );
};

// function LeaveReview({ listing }) {
//   const [showReviewForm, setShowReviewForm] = useState(false);

//   return showReviewForm ? (
//     <ReviewForm 
//       listing={listing} 
//       closeForm={() => setShowReviewForm(false)}
//     />
//   ) : (
//     <button className="button" onClick={() => setShowReviewForm(true)}>
//       Leave a Review
//     </button>
//   );
// }

export default ListingShowPage;
