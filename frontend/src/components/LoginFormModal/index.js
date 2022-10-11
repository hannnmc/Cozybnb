import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignUpForm from '../SignUpModal/SignupForm';


function LoginFormModal() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const toggleMenu = () => {
    setMenu(open => !open);
  };
  const [menu, setMenu] = useState(false);

  return (
    <>
      <button className='profile-button' onClick={toggleMenu}>
        <svg className='profile-burger' width={15} height={15} viewBox="0 0 32 32" fill={'black'} stroke={'#222222'} strokeWidth={3}>
          <g fill="none" fill-rule="nonzero"><path d="m2 16h28"></path><path d="m2 24h28"></path><path d="m2 8h28"></path></g>
        </svg>
        <svg className='profile-icon' width={28} height={28} viewBox="0 0 32 32" fill={'#717171'}>
          <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
        </svg>
      </button>

      {menu && (
          <ul className="profile-dropdown" onClick={() => setMenu(false)}>
              <li onClick={()=> setShowLoginModal(true)}>Log in</li>
              <li id='dropdown-divider' onClick={()=> setShowSignupModal(true)}>Sign up</li>
              <li>Host your home</li>
              <li>Host an experience</li>
              <li>Help</li>
          </ul>
      )}

      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm />
        </Modal>
      )}
      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;