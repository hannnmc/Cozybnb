import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as listingActions from '../../store/listings';
import './ProfileReservations.css'

const ProfileReservations = ({reservation, listings}) => {

    const dispatch = useDispatch();
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
    return (
        <div className='res-item'>
            {listing &&(<img className='res-image' src={listing.photoUrls[0]} alt="loading" />
            )}
            <div className='res-title'>{listing.title}</div>
        </div>
    );
}
 
export default ProfileReservations;