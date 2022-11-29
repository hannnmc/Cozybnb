import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './ProfileListingItem.css'

function ProfileListingItem({ ownedListings, listing, showListingEdit, setShowListingEdit }) {

    const history = useHistory(); 
    const { title, photoUrls, price, averageRating, description, beds } = listing;
    const dispatch = useDispatch();

    const handleEdit = (e) =>{
        e.preventDefault();
        setShowListingEdit(true);
        // dispatch(destroyReservation(reservation.id))
    }

    return (
        <div
        onClick={() => history.push(`/listings/${listing.id}`)}
        >
            <div className="profile-listing-info">
            {photoUrls && ( <div className="profile-image-div"> <img className="profile-listing-image" src={photoUrls[0]} alt='loading...'/></div> )}
                <div className="profile-listing-infobox">
                    <h2  className="profile-item-title">{title}</h2>
                    <div className="profile-listing-fields">
                        <div className="profile-listing-info-top">
                            <div>
                                <span>{description.split(' ').slice(0,5).join(' ')}</span>
                                <span className="description-dots">...</span>

                            </div>
                            <span className="list-item-beds">
                                {beds} beds
                            </span>
                        </div>
                        <div className="profile-listing-info-top">
                            <div>
                                <span className="list-item-copy">${price}</span>
                                <span className="list-item-category"> night</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div 
                    onClick={handleEdit}
                    className='update-listing'>
                    <i className="fa-regular fa-pen-to-square"></i>
                </div> 
            </div>
        </div>
    );
}

export default ProfileListingItem;
