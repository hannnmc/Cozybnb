import React, { useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginDropDown from '../LoginDropdown';
import './Navigation.css';
import logoImg from '../../assets/images/cozybnb_logo.png';
import { useEffect } from 'react';

function Navigation({showLoginModal,setShowLoginModal}) {
  const sessionUser = useSelector(state => state.session.user);
  const { listingId } = useParams();
  const [loginMessage, setLoginMessage] = useState(true);
  let messageTimeout;

  useEffect(() => {
    if(loginMessage) {
      messageTimeout = setTimeout(() => {
        setLoginMessage(false);
        clearTimeout(messageTimeout);
      }, 3000)
    }
  },[loginMessage])

  useEffect(() => {
    if(sessionUser) {
      setLoginMessage(true);
    }
  },[sessionUser])

  let regex = /\/listings\/[0-9]+/i;
  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser}/>
    );
  } else {
    sessionLinks = (
        <LoginDropDown setShowLoginModal={setShowLoginModal}
        showLoginModal={showLoginModal}
        />
    );
  }

  return (
    <div className='nav-bar-wrapper'>
      <div className='nav-bar' style={regex.test(window.location.pathname) ? {width:'87vw', maxWidth:'1120px'} : {} }>
        <NavLink exact to="/">
          <div className='home-box'>
            <img className='logo-img' src={logoImg} alt="logo" />
            <div className='logo-text'>cozybnb</div> 
          </div>
        </NavLink>
        {sessionLinks}
      </div>
      {(loginMessage && sessionUser) && (
        <div className='alert-login'>
          <span>Welcome Back {`${sessionUser.firstName}`}!</span> 
        </div>
      )}
    </div>
  );
}

export default Navigation;
