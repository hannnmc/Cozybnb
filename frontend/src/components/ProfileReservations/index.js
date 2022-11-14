import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as listingActions from '../../store/listings';
import './ProfileReservations.css'
import { useHistory } from 'react-router-dom';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const ProfileReservations = ({reservation, listings}) => {

    const dispatch = useDispatch();
    const history = useHistory(); 
    let photo = null;
    // const reservations = useSelector(state => state.reservations);
    const listing = listings[reservation.listingId];

    // const resArray = Object.entries(reservations);
    // const userReserves = resArray.filter(([key,value]) => value.userId === id); 
    // if (Object.keys(reservations).length > 0 && Object.keys(listings).length > 0 ) {
    //     userReserves.forEach((value,key) => console.log(listings[value[1].listingId].photoUrls[0]))
    // }

    // value[1]['photoUrl'] = 

    // useEffect(()=>{

    // },[listings, reservations])

    useEffect(()=>{
        dispatch(listingActions.fetchListings());
    },[])

    const { startDate, endDate } = reservation;

    const formatStartDate = new Date(startDate);
    const formatEndDate = new Date(endDate);

    console.log(`weee ${new Date(startDate)}`)

    useEffect(() => {
        if (Object.keys(listings).length > 0){
            // debugger
            photo = listings[reservation.listingId].photoUrls[0]
            // console.log(photo)
        }
    },[listings])    



    // console.log(userReserves);

    // console.log(id)
    // console.log(reservations)
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
                    <h3>{`${(formatEndDate.getTime() - formatStartDate.getTime())/1000/60/60/24}`} nights</h3>
                </div>
                <div className='res-details'>Total: ${reservation.total}</div>
                <div className='res-trip-in'>
                    Trip is in {Math.ceil((formatStartDate.getTime() - (new Date()).getTime())/1000/24/60/60)} days
                </div>
            </div>
        </div>
    );
}
 
export default ProfileReservations;