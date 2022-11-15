import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as listingActions from '../../store/listings';
import './ProfileReservations.css'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { destroyReservation } from '../../store/reservations';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const ProfileReservations = ({reservation, listings, ownedReservations}) => {

    const dispatch = useDispatch();
    const history = useHistory(); 
    const today = new Date();
    let photo = null;

    const listing = listings[reservation.listingId];

    useEffect(()=>{
        dispatch(listingActions.fetchListings());
    },[])

    const { startDate, endDate, guests } = reservation;

    const formatStartDate = new Date(startDate);
    const formatEndDate = new Date(endDate);
    const numDays = (Math.ceil((formatEndDate.getTime() - formatStartDate.getTime())/1000/60/60/24));

    useEffect(() => {
        if (Object.keys(listings).length > 0){
            photo = listings[reservation.listingId].photoUrls[0]
        }
    },[listings])    

    let countDown = '';
    if (formatStartDate.getTime() > today.getTime()) {
        countDown = 
        `Trip is in ${Math.ceil((formatStartDate.getTime() - (today).getTime())/1000/24/60/60)} days`
    } else if (formatEndDate.getTime() < today.getTime()) {
        countDown = 'Trip complete'
    } else {
        countDown = 'Trip in progress'
    }

    const handleDelete = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        dispatch(destroyReservation(reservation.id))
    }
        
    if (listing) return (
        <div 
        onClick={() => history.push(`/listings/${listing.id}`)}
        
        className='res-item'>
            {listing &&(<img className='res-image' src={listing.photoUrls[0]} alt="loading" />
            )}
            <div className='res-info'>
                <div className='res-title'>{listing.title}</div>
                <div className='res-dates'>
                    <h3>{`${monthNames[formatStartDate.getMonth()]} ${formatStartDate.getDate()}, ${formatStartDate.getFullYear()} - ${monthNames[formatEndDate.getMonth()]} ${formatEndDate.getDate()}, ${formatEndDate.getFullYear()}`}</h3>
                    <h3>{`${numDays > 0 ? numDays : 0}`} nights</h3>
                </div>
                <div className='res-details'>{`${guests} guests · `} total: ${reservation.total}</div>
                <div className='res-trip-in'>
                    {countDown}
                </div>
                <div 
                onClick={handleDelete}
                className='delete-reservation'>
                    <i className="fa-solid fa-x"></i>
                </div>
            </div>
        </div>
    );
}
 
export default ProfileReservations;