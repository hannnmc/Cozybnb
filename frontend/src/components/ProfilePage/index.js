import './ProfilePage.css'
import ProfileEditForm from './ProfileEditForm';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as listingActions from '../../store/listings';
import ProfileListingItem from '../ProfileListingItem';
import * as reservationActions from '../../store/reservations'
import ProfileReservations from '../ProfileReservations';
// import defaultPhoto from "../../../../frontend/src/assets/images/default_user_photo.png";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const [ showProfileEditForm, setShowProfileEditForm ] = useState(false);
    const user = useSelector(({session}) => session.user );
    

    const openEditProfile = (e) => {
        e.preventDefault();
        setShowProfileEditForm(open => !open)
    };
    const listings = useSelector((state) => state.listings);
    const reservations = useSelector(state => state.reservations);

    useEffect(() => {
        dispatch(listingActions.fetchListings());
        dispatch(reservationActions.fetchReservations());
    },[])

    const ownedListings = [];
    const ownedReservations = [];
    if (Object.keys(listings).length > 0) {

        for (let i = 1; i < Object.keys(listings).length+1 ; i++) {
            if (listings[i].usersId === user.id) {
                ownedListings.push(listings[i]);
            }
        }
    }

    if (Object.keys(reservations).length > 0) {
        // debugger
        for (let i = 1; i < Object.keys(reservations).length+1 ; i++) {
            if (reservations[i].userId === user.id) {
                ownedReservations.unshift(reservations[i]);
            }
        }
    }
    // const resArray = Object.entries(reservations);
    // const userReserves = resArray.filter(([key,value]) => value.userId === id);

    console.log(reservations)

    if (!user) return null;
    
    if (listings && reservations) return (
        <>
        <div className='profile-container'>
            <div className='profile-card'>
                <div className='profile-card-padding'>
                <div className='profile-card-header'>
                    <img className='profile-picture' src={user.photoUrl} alt="profile" />
                </div>
                {/* <div>Update photo</div> */}
                <div className='identity-box'>
                    <div className='badge-icon-div'>
                        <svg className='badge-icon' width={24} height={24} viewBox="0 0 32 32" >
                            <path d="M16 .798l.555.37C20.398 3.73 24.208 5 28 5h1v12.5C29 25.574 23.21 31 16 31S3 25.574 3 17.5V5h1c3.792 0 7.602-1.27 11.445-3.832L16 .798zm0 2.394l-.337.213C12.245 5.52 8.805 6.706 5.352 6.952L5 6.972V17.5c0 6.831 4.716 11.357 10.713 11.497L16 29c6.133 0 11-4.56 11-11.5V6.972l-.352-.02c-3.453-.246-6.893-1.432-10.311-3.547L16 3.192zm7 7.394L24.414 12 13.5 22.914 7.586 17 9 15.586l4.5 4.499 9.5-9.5z"></path>
                        </svg>
                    </div>
                    <div className='identity-verified'>Identity verified</div>
                </div>
                {/* <div>
                    Show others you're really you with the identity verification badge.
                </div> */}
                {/* <div><button>Get the badge</button></div> */}

                <div className='profile-box-divider'></div>
                <div className='user-confirmed'>{`${ user.firstName }`} confirmed</div>
                <div className='confirmed-items'>
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height="16px" width="16px"><path d="M13.102 2.537L15.365 4.8l-9.443 9.443L.057 8.378 2.32 6.115l3.602 3.602z"></path></svg>
                    <div>Identity</div>
                </div>
                <div className='confirmed-items'>
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height="16px" width="16px"><path d="M13.102 2.537L15.365 4.8l-9.443 9.443L.057 8.378 2.32 6.115l3.602 3.602z"></path></svg>
                    <div>Birthdate</div>
                </div>
                <div className='confirmed-items'>
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height="16px" width="16px"><path d="M13.102 2.537L15.365 4.8l-9.443 9.443L.057 8.378 2.32 6.115l3.602 3.602z"></path></svg>
                    <div>Email address</div>
                </div>
                {/* <div className='profile-box-divider'></div> */}
            
                </div>
                </div>
                
            <div className='profile-right-container'>
                <h1 className='profile-hello'>Hi, I'm {`${ user.firstName }`}</h1>
                <div className='joined-year'>Joined in {`${user.createdAt.slice(0,4)}`}</div>
                <div className='edit-profile-button' onClick={openEditProfile}>Edit Profile</div>
                {showProfileEditForm && (
                    <>
                        <ProfileEditForm setShowProfileEditForm={setShowProfileEditForm}/>
                        <div className='profile-divider'>________</div>
                    </>
                )}

                <div className='profile-about'>About</div>
                <div className='profile-user-location'>
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height= "16px" width= "16px"><path d="M8.602 1.147l.093.08 7.153 6.914-.696.718L14 7.745V14.5a.5.5 0 0 1-.41.492L13.5 15H10V9.5a.5.5 0 0 0-.41-.492L9.5 9h-3a.5.5 0 0 0-.492.41L6 9.5V15H2.5a.5.5 0 0 1-.492-.41L2 14.5V7.745L.847 8.86l-.696-.718 7.153-6.915a1 1 0 0 1 1.297-.08z"></path></svg>
                    <div className='profile-location'>Lives in New York, NY</div>
                </div>
                <div className='profile-box-divider'></div>

                <div className='profile-reservations'>
                    <h1>Trips</h1>
                    <div className='reservation-list'>
                        {ownedReservations.map(reservation => (
                            <ProfileReservations 
                                key={reservation.id}
                                reservation={reservation}
                                listings={listings}
                                ownedReservations={ownedReservations}
                                />
                        ))}
                    </div>
                
                
                </div>

                

                <div className='profile-box-divider'></div>
                
                <div className='profile-mylistings'>My Listings</div>

                <div className='profile-listings'>
                    {ownedListings.map(listing => (
                        <ProfileListingItem 
                            key={listing.id}
                            listing={listing}
                            ownedListings={ownedListings}
                        />
                    ))}
                </div>
                <div id='profile-box-divider' className='profile-box-divider'></div>
                <div className='review-count-container'>
                    <div className='profile-review-star'>
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height='24px' width='24px'><path d="M14.998 1.032a2 2 0 0 0-.815.89l-3.606 7.766L1.951 10.8a2 2 0 0 0-1.728 2.24l.031.175A2 2 0 0 0 .87 14.27l6.36 5.726-1.716 8.608a2 2 0 0 0 1.57 2.352l.18.028a2 2 0 0 0 1.215-.259l7.519-4.358 7.52 4.358a2 2 0 0 0 2.734-.727l.084-.162a2 2 0 0 0 .147-1.232l-1.717-8.608 6.361-5.726a2 2 0 0 0 .148-2.825l-.125-.127a2 2 0 0 0-1.105-.518l-8.627-1.113-3.606-7.765a2 2 0 0 0-2.656-.971zm-3.07 10.499l4.07-8.766 4.07 8.766 9.72 1.252-7.206 6.489 1.938 9.723-8.523-4.94-8.522 4.94 1.939-9.723-7.207-6.489z"></path></svg>
                    </div>
                    <div className='user-review-count'>0 reviews</div>
                </div>
                {/* <div className='profile-box-divider'></div>
                <div>Reviews by you</div>
                <div className='profile-box-divider'></div> */}
            </div>
        </div>
        </>
    );
}
 
export default ProfilePage;