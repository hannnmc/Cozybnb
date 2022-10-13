import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import profileImg from '../../assets/images/profile_icon.jpg'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(open => !open);
  };
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    console.log('logout')
    dispatch(sessionActions.logout());
  };

  return (
    <>
        <button className='profile-button' onClick={toggleMenu}>
        <svg className='profile-burger' width={16} height={16} viewBox="0 0 32 32" fill={'#222222'} stroke={'#222222'} strokeWidth={3}>
          <g fill="none" fill-rule="nonzero"><path d="m2 16h28"></path><path d="m2 24h28"></path><path d="m2 8h28"></path></g>
        </svg>
        <img className="profile-avatar" src={profileImg} alt="profile-icon" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="dropdown-email">{user.email}</li>
          <li><a className="linkin-tag" href="https://github.com/hannnmc" target="_blank" rel="noopener noreferrer">Github</a></li>
          <li ><a className="linkin-tag" href="https://www.linkedin.com/in/hanchen28/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li className="dropdown-divider"></li>
          <li>Host your home</li>
          <li>Host an experience</li>
          <li><NavLink exact to="/profile">Profile</NavLink></li>
          <li className="dropdown-divider"></li>
          <li>Help</li>
          <li>
            <button className="logout-button" onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
