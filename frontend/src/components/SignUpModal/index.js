import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignupForm';


function SignUpModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
}

export default SignUpModal;