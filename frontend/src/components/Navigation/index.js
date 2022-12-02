import React from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginDropDown from '../LoginDropdown';
import './Navigation.css';
import logoImg from '../../assets/images/cozybnb_logo.png';

function Navigation({showLoginModal,setShowLoginModal}) {
  const sessionUser = useSelector(state => state.session.user);
  const { listingId } = useParams();
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
    </div>
  );
}

export default Navigation;
