import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as listingActions from '../../store/listings';
import './ProfileReservations.css'

const ProfileReservations = () => {

    const dispatch = useDispatch();
    const reservations = useSelector(state => state.reservations);
    const listings = useSelector(state => state.listings);
    const {id} = useSelector(state => state.session.user);

    const resArray = Object.entries(reservations);
    const userReserves = resArray.filter(([key,value]) => value.userId === id); 
    if (Object.keys(reservations).length > 0 && Object.keys(listings).length > 0 ) {
        userReserves.forEach((value,key) => console.log(listings[value[1].listingId].photoUrls[0]))
    }

    // value[1]['photoUrl'] = 

    useEffect(()=>{

    },[listings, reservations])

    useEffect(()=>{
        dispatch(listingActions.fetchListings());
    },[])

    // console.log(userReserves);

    // console.log(id)
    // console.log(reservations)
    return (
        <div>
            
        </div>
    );
}
 
export default ProfileReservations;