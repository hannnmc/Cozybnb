import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import googleIcon from '../../assets/images/google_icon.png'

function LoginForm(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { setShowLoginModal, setShowSignupModal } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        let data;
        try {

          data = await res.clone().json();
        } catch {
          data = await res.text(); 
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  const loginDemoUser = (e) => {
    return dispatch(sessionActions.login({    
      email: 'hanmikechen@gmail.com', 
      password: 'password'
    }));
  };
  const loginFacebookUser = (e) => {
    return dispatch(sessionActions.login({    
      email: 'Tammylove@fb.com', 
      password: 'password'
    }));
  };
  const loginGoogleUser = (e) => {
    return dispatch(sessionActions.login({    
      email: 'kimmystar@gmail.com', 
      password: 'password'
    }));
  };
  const loginAppleUser = (e) => {
    return dispatch(sessionActions.login({    
      email: 'apple4ever@icloud.com', 
      password: 'password'
    }));
  };

  const toggleSignup = (e) => {
    e.preventDefault();
    setShowLoginModal(false);
    setShowSignupModal(true);
  }

  return (
    <>
      <div className="login-modal">
        <div onClick={()=>setShowLoginModal(false)} className="login-x-button"><span className="material-symbols-outlined">close</span></div>
      <header>
        <div></div>
        <div className="header-login">Log in</div>
        <div></div>
      </header>
      <div>
        <h3>Welcome to Cozybnb</h3>
      </div>
        <form onSubmit={handleSubmit}>
          <div className="email-input-div">
            <input
              className="email-input"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="email-floating-label">Email</span>
          </div>
          <div className="ps-input-div">
            <input
            className="ps-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
            <span className="ps-floating-label">Password</span>
          </div>
          <div className="error-message">
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          </div>
      
          <div className="login-message">You may also 
          <span className="signup-span"
          onClick={toggleSignup}
          >Signup</span>
          </div>
          <button 
          type="submit">Continue</button>
        </form>
        <div className="orline-divider">
          <div className="div-line-1"></div>
          <div className="or-word">or</div> 
          <div className="div-line-2"></div>
        </div>
        <div className='demo-buttons'>
          <div onClick={() => loginFacebookUser()}>
            <i className="fa-brands fa-facebook"></i>
            <span>Continue with Facebook</span>
            <div></div>
          </div>
          <div onClick={() => loginGoogleUser()}>
          <img className="google-icon" src={googleIcon} alt={<i className="fa-brands fa-google"></i>} />
 
            <span>Continue with Google</span>
            <div></div>
          </div>
          <div onClick={() => loginAppleUser()}>
            <i className="fa-brands fa-apple"></i>
            <span>Continue with Apple</span>
            <div></div>
          </div>
          <div  onClick={() => loginDemoUser()}>
            <i className="material-symbols-outlined" id="mail-icon">mail</i>
            <span>Continue with Demo User</span>
            <div></div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default LoginForm;