import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    
    //   const reviews = useSelector(getListingReviews(parseInt(listingId)));
        
    useEffect(() => {
        dispatch(fetchListing(listingId));
        dispatch(fetchUsers());
    }, [listingId, dispatch]);

    if (!listing || !users) {
        return null;
    }
    
    const { usersId, description, beds, bedrooms, baths, guests, propType, averageRating, photoUrls, city, country } = listing;
    
    const user = users[usersId];

    //   const hasReviewed = sessionUser && reviews.some(review => review.authorId === sessionUser.id);

  if(user) return (
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
        {photoUrls && <img src={photoUrls[0]} alt='loading...' className="listing-show-image main"/>}
        </div>
        <div className='second-col-photos'>
            {photoUrls && <img src={photoUrls[1]} alt='loading...' className="listing-show-image"/>}
            {photoUrls && <img src={photoUrls[2]} alt='loading...' className="listing-show-image"/>}
        </div>
        <div className='third-col-photos'>
            {photoUrls && <img src={photoUrls[3]} alt='loading...' className="listing-show-image"/>}
            {photoUrls && <img src={photoUrls[4]} alt='loading...' className="listing-show-image"/>}
        </div>
      </div>
      <section className="listing-details">
        <div className='listing-detail-header'>
            <div className='listing-detail-specs'>
                <h2>{propType} hosted by {`${user.firstName}`}</h2>
                <span>{`${guests} guests`}</span>
                <span className='hosted-dot'>·</span>
                <span>{`${bedrooms}`}{bedrooms > 1 ? ' bedrooms' : ' bedroom'}</span>
                <span className='hosted-dot'>·</span>
                <span>{`${beds}`} {beds > 1 ? 'beds' : 'bed'}</span>
                <span className='hosted-dot'>·</span>
                <span>{`${baths}`} {baths > 1 ? 'baths' : 'bath'}</span>
            </div>
            <div className='listing-detail-avatar'>
            <img className='owner-avatar' src={user.photoUrl} alt="avatar" />
            </div>
        </div>

        <div className='showpage-divider'></div>
        <div className='listing-features'>
            <div id='show-superhost-container'>
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height="24" width='24'><path d="m16 17c3.8659932 0 7 3.1340068 7 7s-3.1340068 7-7 7-7-3.1340068-7-7 3.1340068-7 7-7zm0 2c-2.7614237 0-5 2.2385763-5 5s2.2385763 5 5 5 5-2.2385763 5-5-2.2385763-5-5-5zm9.6666667-18.66666667c1.0543618 0 1.9181651.81587779 1.9945142 1.85073766l.0054858.14926234v6.38196601c0 .70343383-.3690449 1.35080636-.9642646 1.71094856l-.1413082.0779058-9.6666667 4.8333334c-.5067495.2533747-1.0942474.2787122-1.6171466.0760124l-.1717078-.0760124-9.66666666-4.8333334c-.62917034-.3145851-1.04315599-.93418273-1.09908674-1.62762387l-.00648607-.16123049v-6.38196601c0-1.05436179.81587779-1.91816512 1.85073766-1.99451426l.14926234-.00548574zm0 2h-19.33333337v6.38196601l9.66666667 4.83333336 9.6666667-4.83333336z"></path></svg>
                <div id='show-superhost'>{user.firstName} is a Superhost</div>
            </div>
            <span className='superhost-description'>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</span>
        </div>
        <div className='showpage-divider'></div>
        <p className='show-description'> {description} </p>

        </section>
            <div className='showpage-divider'></div>
        <section className="listing-show-section">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height='24px' width='24px'><path d="M14.998 1.032a2 2 0 0 0-.815.89l-3.606 7.766L1.951 10.8a2 2 0 0 0-1.728 2.24l.031.175A2 2 0 0 0 .87 14.27l6.36 5.726-1.716 8.608a2 2 0 0 0 1.57 2.352l.18.028a2 2 0 0 0 1.215-.259l7.519-4.358 7.52 4.358a2 2 0 0 0 2.734-.727l.084-.162a2 2 0 0 0 .147-1.232l-1.717-8.608 6.361-5.726a2 2 0 0 0 .148-2.825l-.125-.127a2 2 0 0 0-1.105-.518l-8.627-1.113-3.606-7.765a2 2 0 0 0-2.656-.971zm-3.07 10.499l4.07-8.766 4.07 8.766 9.72 1.252-7.206 6.489 1.938 9.723-8.523-4.94-8.522 4.94 1.939-9.723-7.207-6.489z"></path></svg>

            <span className="average-rating">
            {averageRating || 'No reviews (yet)'}
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

        <div className='showpage-divider'></div>
        <div className='will-be'>
            <span>Where you'll be</span> 
            <span>{city}, {country}</span>
        </div>

        <section className='map-section'>
            <div className='show-map'>
                <ListingMap
                    listings={[listing]}
                    mapOptions={{ 
                    center: { lat: listing.lat, lng: listing.lng }, 
                    zoom: 17, 
                    mapId: "49aa6f67e21bd8eb"
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
