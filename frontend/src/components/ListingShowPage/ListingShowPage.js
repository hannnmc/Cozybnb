import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ListingMap from '../ListingMap';
// import ReviewForm from './ReviewForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListing } from '../../store/listings';
import { fetchUsers } from '../../store/users';
// import { destroyReview, getListingReviews } from '../../store/reviews';
import './ListingShowPage.css';

function ListingShowPage() {
    const dispatch = useDispatch();
    const { listingId } = useParams();

    // const sessionUser = useSelector(state => state.session.user);
    const listing = useSelector(state => state.listings[listingId]);
    const users = useSelector(state => state.users);

    // debugger

    // const owner = users.filter(user => user.id === listing.user_id);
    // state => state.users.filter(user => user.id === listing.userId) )

    //   const reviews = useSelector(getListingReviews(parseInt(listingId)));
        
    useEffect(() => {
        dispatch(fetchListing(listingId));
        // dispatch(fetchUsers());
    }, [listingId, dispatch]);

    if (!listing) {
        return null;
    }
    

  const { userId, description, guests, lat, lng, averageRating, photoUrl } = listing;
//   const user = users.filter(user => user.id === listing.userId);

// let ownerName;
//     if(users.userId) {
//         ownerName = users.listingId;
//     }

    //   const hasReviewed = sessionUser && reviews.some(review => review.authorId === sessionUser.id);

  return (
    <div className="listing-show">
      <div className="listing-show-header">
        <h1>{listing.title}</h1>
        {/* <Link to="/">Back to Listings Index</Link> */}
        <div className='show-header-info'>
            
            <svg className={"svg-star"} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height={"14px"} width={"14px"} fill="#222222" display={"inline-block"}>
                    <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fillRule="evenodd"></path>
                </svg>
                <span className='show-info-reviews'>{averageRating || 'No reviews yet'}</span>
                <span className='divider-dot'>·</span>
            <span>{`${listing.city}, ${listing.state}, ${listing.country}`}</span>
        </div>
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
        <h2>hosted by {`${listingId}`}</h2>
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
            mapOptions={{ 
            center: { lat: listing.lat, lng: listing.lng }, 
            zoom: 17, 
            mapId: "49aa6f67e21bd8eb",
            gestureHandling: "none"
        }}
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
