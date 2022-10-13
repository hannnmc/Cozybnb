import './ProfilePage.css'
import ProfileEditForm from './ProfileEditForm';
import { useState } from 'react';
import badge from '../../assets/images/badge.png'

const ProfilePage = () => {
    const [ showProfileEditForm, setShowProfileEditForm ] = useState(false);

    const initialState = { 
        user: JSON.parse(sessionStorage.getItem("currentUser"))
    };
    const {user} = initialState
    const openEditProfile = () => {

    };
    return (
        <>
        <div className='profile-container'>
            <div className='profile-card'>
                <div>Profile Photo</div>
                <div>Update photo</div>
                <div>
                    <svg className='badge-icon' width={24} height={24} viewBox="0 0 32 32" >
                        <path d="M16 .798l.555.37C20.398 3.73 24.208 5 28 5h1v12.5C29 25.574 23.21 31 16 31S3 25.574 3 17.5V5h1c3.792 0 7.602-1.27 11.445-3.832L16 .798zm0 2.394l-.337.213C12.245 5.52 8.805 6.706 5.352 6.952L5 6.972V17.5c0 6.831 4.716 11.357 10.713 11.497L16 29c6.133 0 11-4.56 11-11.5V6.972l-.352-.02c-3.453-.246-6.893-1.432-10.311-3.547L16 3.192zm7 7.394L24.414 12 13.5 22.914 7.586 17 9 15.586l4.5 4.499 9.5-9.5z"></path>
                    </svg>
                </div>
                <div>Identity Verification</div>
                <div>
                    Show others you're really you with the identity verification badge.
                </div>
                <div><button>Get the badge</button></div>

                <div className='profile-divider'>________</div>
                <div>{`${ user.firstName }`} confirmed</div>
                <div> Email address</div>
                <div className='profile-divider'>________</div>
            
            </div>
            <div>
                <h1>Hi, I'm {`${ user.firstName }`}</h1>
                <div>Joined in {`${user.createdAt.slice(0,4)}`}</div>
                <div onClick={() => setShowProfileEditForm(true)}>Edit Profile</div>
                {showProfileEditForm && (
                    <>
                        <ProfileEditForm setShowProfileEditForm={setShowProfileEditForm}/>
                        <div className='profile-divider'>________</div>
                    </>
                    
                    
                )}
                <div>0 Reviews</div>
                <div className='profile-divider'>________</div>
                <div>Reviews by you</div>
                <div className='profile-divider'>________</div>
            </div>
        </div>
        </>
    );
}
 
export default ProfilePage;