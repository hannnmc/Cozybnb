import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logoImg from '../../assets/images/cozybnb_logo.png';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  // const toggleMenu = () => {
  //   setMenu(open => !open);
  // }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser}/>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal/>
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
      </>
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
