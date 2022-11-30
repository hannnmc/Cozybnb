import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListingMap from '../ListingMap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListing } from '../../store/listings';
import { fetchUsers } from '../../store/users';
import './ListingShowPage.css';
import FloatingBox from './FloatingBox';
import ListingFeatures from './ListingFeatures';
import DatePickerComp from './DatePickerComp';
import * as reviewActions from '../../store/reviews';
import ListingReviews from '../ListingReviews';
import { Modal } from '../../context/Modal';
import ReviewForm from '../ReviewForm/';
import ReviewBars from '../ReviewBars';
import ListingEditForm from '../ListingEditForm';
import { restoreSession } from '../../store/session';


let lunar = false;

if (new Date().getFullYear() % 4 === 0) lunar = true;
const maxMonthDays = {
    0:31,
    1:lunar ? 29 : 28,
    2:31,
    3:30,
    4:31,
    5:30,
    6:31,
    7:31,
    8:30,
    9:31,
    10:30,
    11:31,
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function ListingShowPage({showLoginModal,setShowLoginModal, showListingEdit, setShowListingEdit}) {
    
    const dispatch = useDispatch();

    const [startDate, setStartDate] = useState(new Date());
    const [reviewModal, setReviewModal] = useState(false);
    const [numDays, setNumDays] = useState(5);
    const [endMonth, setEndMonth] = useState(startDate.getMonth());
    const [endDay, setEndDay] = useState(startDate.getDate() + numDays);
    const [startingDay, setStartingday] = useState(startDate.getDate());
    const [endYear, setEndYear] = useState(startDate.getFullYear());
    const dayOverage = (startingDay + numDays) % maxMonthDays[startDate.getMonth()];

    const [endDate, setEndDate] = useState(new Date(startDate.getFullYear(), endMonth, endDay));
    const [value, onChange] = useState([startDate,endDate]);
    const { listingId } = useParams();
    const listing = useSelector(state => state.listings[listingId]);
    const users = useSelector(state => state.users);
    const currentUser = useSelector(state => state.session.user)
    const reviews = useSelector(state => Object.values(state.reviews));
    const reservations = useSelector(state => Object.values(state.reservations));
    const listingReview = reviews.filter(review =>
        review.listingId === parseInt(listingId));
    const listingReservation = reservations.filter(reservation =>
        reservation.listingId === parseInt(listingId));

    const reservedDates = [];
    if (listingReservation)
        listingReservation.forEach((reservation) => {
        
        for (let i = 0; i < reservation.days; i++) {
            let start = new Date(reservation.startDate);
            start.setDate(start.getDate() + i)
            reservedDates.push(`${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}`)
        }
        })

    useEffect(() => {
        if (dayOverage < startDate.getDate()) {
            if (endMonth === 12) {
                setEndYear(startDate.getFullYear() + 1);
                setEndMonth(1);
                setEndDay(dayOverage);
            } else {
                setEndMonth(startDate.getMonth() + 1);
                setEndDay(dayOverage);
            }
        } else {
            setEndDay(startDate.getDate() + numDays);
            setStartDate(new Date(`${startDate.getFullYear()}, ${startDate.getMonth()+1},${startDate.getDate()}`));
        }
        dispatch(reviewActions.fetchReviews())
    },[])    

    useEffect(() => {
        if (startDate !== value[0] || endDate !== value[1])(
            onChange([startDate,endDate])
        )
    },[startDate,endDate])    
    
    useEffect(() => {
        dispatch(fetchListing(listingId));
        dispatch(fetchUsers());
    }, [listingId, dispatch]);

    useEffect(() => {
        dispatch(restoreSession());
    },[])

    const writeReview = (e) => {
        e.preventDefault();
        if (currentUser) {
            setReviewModal(true);
        } else {
            setShowLoginModal(true);
        }
    } 
    
    if (!listing || !users) {
        return null;
    }
    
    const { userId, description, beds, bedrooms, baths, guests, propType, photoUrls, city, country } = listing;
    
    const user = users[userId];

    let avgListingReview = 0;

    if (listingReview.length > 0) {
        listingReview.forEach(review => {
            avgListingReview += review.rating;
        })
        avgListingReview = avgListingReview/listingReview.length
    }

    let reviewHeader = null;
    let reviewMain = null;

    if (listingReview.length > 0) {
        reviewHeader = 
        <div>{`${parseFloat(avgListingReview).toFixed(1)} · `}
            <span>
                <a className='underscore-removal' href="#reviews-header">{listingReview.length} reviews</a>
            </span>
        </div>
        reviewMain = 
        <div className='reviewMain'>
            <svg className={"svg-star"} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height={"16px"} width={"16px"} fill="#222222" display={"inline-block"}>
            <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fillRule="evenodd"></path>
            </svg>
            <div className='reviewMain-text'>{`${parseFloat(avgListingReview).toFixed(1)} · `} 
                <span>{listingReview.length} reviews</span>
            </div>
        </div>
    } else {
        reviewHeader = <div>New</div>
        reviewMain =             <div className='reviewMain'>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height='24px' width='24px'><path d="M14.998 1.032a2 2 0 0 0-.815.89l-3.606 7.766L1.951 10.8a2 2 0 0 0-1.728 2.24l.031.175A2 2 0 0 0 .87 14.27l6.36 5.726-1.716 8.608a2 2 0 0 0 1.57 2.352l.18.028a2 2 0 0 0 1.215-.259l7.519-4.358 7.52 4.358a2 2 0 0 0 2.734-.727l.084-.162a2 2 0 0 0 .147-1.232l-1.717-8.608 6.361-5.726a2 2 0 0 0 .148-2.825l-.125-.127a2 2 0 0 0-1.105-.518l-8.627-1.113-3.606-7.765a2 2 0 0 0-2.656-.971zm-3.07 10.499l4.07-8.766 4.07 8.766 9.72 1.252-7.206 6.489 1.938 9.723-8.523-4.94-8.522 4.94 1.939-9.723-7.207-6.489z"></path></svg><div className='no-reviews-yet'>No reviews (yet)</div>
        </div>
    }


  if(user) return (
    <div className="listing-show">
      <div className="listing-show-header">
        <h1>{listing.title}</h1>
        {/* <Link to="/">Back to Listings Index</Link> */}
        <div className='show-header-info'>
            
            <svg className={"svg-star"} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height={"14px"} width={"14px"} fill="#222222" display={"inline-block"}>
            <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fillRule="evenodd"></path>
            </svg>
                <span className='show-info-reviews'>{reviewHeader}</span>
                <span className='divider-dot'>·</span>
            <span>{`${listing.city}, ${listing.state}, ${listing.country}`}</span>
        </div>
      </div>
      <div className="listing-show-visuals">
        <div className='first-col-photo'>
        {photoUrls[0] ? <img src={photoUrls[0]} alt='loading...' className="listing-show-image main"/> : <img src='https://thecozybnb-dev.s3.amazonaws.com/default_property_image.svg' className="listing-show-image main" /> }
        </div>
        <div className='second-col-photos'>
            {photoUrls[1] ? <img src={photoUrls[1]} alt='loading...' className="listing-show-image"/> : <img src='https://thecozybnb-dev.s3.amazonaws.com/default_property_image.svg' className="listing-show-image" />}
            {photoUrls[2] ? <img src={photoUrls[2]} alt='loading...' className="listing-show-image"/> : <img src='https://thecozybnb-dev.s3.amazonaws.com/default_property_image.svg' className="listing-show-image" /> }
        </div>
        <div className='third-col-photos'>
            {photoUrls[3] ? <img src={photoUrls[3]} alt='loading...' className="listing-show-image"/> : <img src='https://thecozybnb-dev.s3.amazonaws.com/default_property_image.svg' className="listing-show-image" />}
            {photoUrls[4] ? <img src={photoUrls[4]} alt='loading...' className="listing-show-image"/> : <img src='https://thecozybnb-dev.s3.amazonaws.com/default_property_image.svg' className="listing-show-image" /> }
        </div>
      </div>
      <section className="listing-details">
        <div className='listing-details-left'>

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
                    <div className='show-feature-title'>{user.firstName} is a Superhost</div>
                </div>
                <span className='feature-description'>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</span>
                <div className='show-checkin-container'>
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height='24px' width='24px'><path d="m24.3334 1.66675c1.0543745 0 1.9181663.81587127 1.9945143 1.85073677l.0054857.14926323-.00065 24.666 3.00065.00075v2h-26.66665v-2l3-.00075v-24.666c0-1.05436681.81587301-1.91816558 1.850737-1.99451429l.149263-.00548571zm-4.00065 2h-12.666l-.00075 24.66625 12.66675-.00025zm4.00065 0h-2.00065v24.666l2.00025.00025zm-7.0001 11.00002c.7363778 0 1.33333.5969522 1.33333 1.33333s-.5969522 1.33333-1.33333 1.33333-1.33333-.5969522-1.33333-1.33333.5969522-1.33333 1.33333-1.33333z"></path></svg>

                <div className='show-feature-title'>Self check-in</div>
                </div>
                <span className='feature-description'>You can check in with the smart lock.</span>
                <div className='show-cancellation-container'>
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height='24px' width='24px'><path d="m11.6667 0-.00095 1.666h8.667l.00055-1.666h2l-.00055 1.666 6.00065.00063c1.0543745 0 1.9181663.81587127 1.9945143 1.85073677l.0054857.14926323v15.91907c0 .4715696-.1664445.9258658-.4669028 1.2844692l-.1188904.1298308-8.7476886 8.7476953c-.3334303.3332526-.7723097.5367561-1.2381975.5778649l-.1758207.0077398h-12.91915c-2.68874373 0-4.88181754-2.1223321-4.99538046-4.7831124l-.00461954-.2168876v-21.66668c0-1.05436021.81587582-1.91815587 1.85073739-1.99450431l.14926261-.00548569 5.999-.00063.00095-1.666zm16.66605 11.666h-24.666v13.6673c0 1.5976581 1.24893332 2.9036593 2.82372864 2.9949072l.17627136.0050928 10.999-.0003.00095-5.6664c0-2.6887355 2.122362-4.8818171 4.7832071-4.9953804l.2168929-.0046196 5.66595-.0006zm-.081 8-5.58495.0006c-1.5977285 0-2.9037573 1.2489454-2.9950071 2.8237299l-.0050929.1762701-.00095 5.5864zm-18.586-16-5.999.00062v5.99938h24.666l.00065-5.99938-6.00065-.00062.00055 1.66733h-2l-.00055-1.66733h-8.667l.00095 1.66733h-2z"></path></svg>

                <div className='show-feature-title'>Free cancellation for 48 hours.</div>

                </div>
                
            </div>
            <div className='showpage-divider'></div>
            <p className='show-description'> {description} </p>
            <div className='showpage-divider'></div>

            <div className='show-sleep'>
                <span>Where you'll sleep</span>

                <div className='show-sleep-box'>
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height='24px' width='24px'><path d="M26 4a2 2 0 0 1 1.995 1.85L28 6v7.839l1.846 5.537a3 3 0 0 1 .115.468l.03.24.009.24V30h-2v-2H4v2H2v-9.675a3 3 0 0 1 .087-.717l.067-.232L4 13.836V6a2 2 0 0 1 1.697-1.977l.154-.018L6 4zm2 18H4v4h24zm-1.388-6H5.387l-1.333 4h23.891zM26 6H6v8h2v-4a2 2 0 0 1 1.85-1.995L10 8h12a2 2 0 0 1 1.995 1.85L24 10v4h2zm-11 4h-5v4h5zm7 0h-5v4h5z"></path></svg>
                    <span>Bedroom area</span>
                    <p>{listing.beds} queen-size beds</p>
                </div>
            </div>
            <div className='showpage-divider'></div>
            <div className='listing-offers'>
                <span>What this place offers</span>
                <ListingFeatures listing={listing}/>
            </div>
            <div
            id='reviews-header' className='showpage-divider'></div>
            <div className='showpage-calendar'>
                <div className='calendar-header'>
                    <h2>{`${numDays} nights in ${city}`}</h2>
                    <h3>{`${monthNames[startDate.getMonth()]} ${startDate.getDate()}, ${startDate.getFullYear()} - ${monthNames[endDate.getMonth()]} ${endDate.getDate()}, ${endDate.getFullYear()}`}</h3>
                </div>
                <div className='show-datepicker'>
                    <DatePickerComp 
                    startDate={startDate}
                    setStartDate={setStartDate} 
                    endDate={endDate}
                    setEndDate={setEndDate}
                    value={value}
                    onChange={onChange}
                    numDays={numDays}
                    // listingReservation={listingReservation}
                    setNumDays={setNumDays}
                    reservedDates={reservedDates}
                    />
                </div>
            </div>
        </div>
        <FloatingBox listing={listing}
        startDate={startDate}
        setStartDate={setStartDate} 
        endDate={endDate}
        setEndDate={setEndDate}
        numDays={numDays}
        setNumDays={setNumDays}
        setShowLoginModal={setShowLoginModal}
        showLoginModal={showLoginModal}
        reviews={listingReview}
        setShowListingEdit={setShowListingEdit}
        listingReservation={listingReservation}
        reservedDates={reservedDates}
        />
        <div className='showpage-divider'></div>
        </section>
            <div className='showpage-divider'></div>
        <section className="listing-show-section">
            <span className="average-rating">
            {reviewMain}
            </span>

            {listingReview.length > 0 && (<ReviewBars 
            listingReview={listingReview}
            />)}

            <ListingReviews 
            reviews={listingReview} 
            users={users}/>

            {/* {!hasReviewed && <LeaveReview listing={listing} />} */}
            <button 
            onClick={writeReview} className='listing-write-review'>Write a review</button>
        </section>

        <div className='showpage-divider'></div>
        <div className='show-will-be'>
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
        {reviewModal && (
            <Modal onClose={() => setReviewModal(false)}>
                <ReviewForm 
                user={user}
                listing={listing}
                setReviewModal={setReviewModal}
                />
            </Modal>
        )}
        {showListingEdit && (
            <Modal onClose={() => setShowListingEdit(false)}>
                <ListingEditForm 
                listing={listing}
                setShowListingEdit={setShowListingEdit}
                />
            </Modal>
        )}
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
