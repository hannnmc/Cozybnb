import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginDropDown from '../LoginDropdown';
import './Navigation.css';
import logoImg from '../../assets/images/cozybnb_logo.png';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser}/>
    );
  } else {
    sessionLinks = (
        <LoginDropDown/>
    );
  }

  return (
    <ul>
      <li className='nav-bar'>
        <NavLink exact to="/">
          <div className='home-box'>
            <img className='logo-img' src={logoImg} alt="logo" />
            <div className='logo-text'>cozybnb</div> 
          </div>
        </NavLink>
        {sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
