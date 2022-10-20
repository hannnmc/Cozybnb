import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { Modal } from "../../context/Modal";
import NewListingForm from '../NewListingForm';



function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [newListingModal, setNewListingModal] = useState(false); 

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
    dispatch(sessionActions.logout());
  };

  return (
    <>
        <button className='profile-button' onClick={toggleMenu}>
        <svg className='profile-burger' width={16} height={16} viewBox="0 0 32 32" fill={'#222222'} stroke={'#222222'} strokeWidth={3}>
          <g fill="none" fillRule="nonzero"><path d="m2 16h28"></path><path d="m2 24h28"></path><path d="m2 8h28"></path></g>
        </svg>
        <img className="profile-avatar" src={user.photoUrl} alt=""/>

      </button>
      {newListingModal && (
        <Modal onClose={() => setNewListingModal(false)}>
          <NewListingForm setNewListingModal={setNewListingModal} />
        </Modal>
      )}
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="dropdown-email">{user.email}</li>
          <li><a className="linkin-tag" href="https://github.com/hannnmc" target="_blank" rel="noopener noreferrer">Github</a></li>
          <li ><a className="linkin-tag" href="https://www.linkedin.com/in/hanchen28/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li className="dropdown-divider"></li>
          <li onClick={()=> setNewListingModal(true)}>Host your home</li>
          <li>Host an experience</li>
          <NavLink className="profile-link" exact to="/profile">
            <li id="profile-link">Profile</li>
          </NavLink>
          
          <li className="dropdown-divider"></li>
          <li>Help</li>
          <li  onClick={logout}>
            <button className="logout-button" onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
