import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';


function SignUpForm() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const loginDemoUser = (e) => {
    console.log('sdfsd');
    return dispatch(sessionActions.login({    
      credential: 'hanmikechen@gmail.com', 
      password: 'password'
    }));
  };
  const loginFacebookUser = (e) => {
    console.log('sdfsd');
    return dispatch(sessionActions.login({    
      credential: 'facebookUser@fb.com', 
      password: 'password'
    }));
  };
  const loginGoogleUser = (e) => {
    console.log('sdfsd');
    return dispatch(sessionActions.login({    
      credential: 'googleuser@gmail.com', 
      password: 'password'
    }));
  };
  const loginAppleUser = (e) => {
    console.log('sdfsd');
    return dispatch(sessionActions.login({    
      credential: 'appleuser@icloud.com', 
      password: 'password'
    }));
  };




    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password) {
        setErrors([]);
        return dispatch(sessionActions.signup({ email, username, password }))
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
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };



// function SignUpForm() {
//     const dispatch = useDispatch();
//     const sessionUser = useSelector(state => state.session.user);

//     const [errors, setErrors] = useState([]);

//     if (sessionUser) return <Redirect to="/" />;
    


  return (
    <>
      <div className="signup-modal">
        <div className="login-x-button"><span class="material-symbols-outlined">close</span></div>
      <header>
        <div></div>
        <div className="header-login">Finish signing up</div>
        <div></div>
      </header>
      <div className="signup-div">
        <form onSubmit={handleSubmit}>
          <div className="input-div">
            <input
              className="firstname-input"
              placeholder="First name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            {/* <span className="fn-floating-label">First name</span> */}
          </div>
          <div className="input-div">
            <input
            className="lastname-input"
              type="password"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Last name"
            />
            {/* <span className="ln-floating-label">Last name</span> */}
          </div>
          <div className="matchname-message">Make sure it matches the name on your government ID.</div>
          <div className="error-message">
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          </div>
          <div className="input-div">
            <input
            className="birthdate-input"
              type="password"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
              placeholder="Birthdate"
            />
            {/* <span className="ln-floating-label">Last name</span> */}
          </div>
          <div className="birthdate-message">By selecting agree and continue, I agree to Cozybnb's Terms of Service. </div>
          <div className="input-div">
            <input
            className="birthdate-input"
              type="password"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
            {/* <span className="ln-floating-label">Last name</span> */}
          </div>
          <div className="email-message">We'll email you trip confirmations and receipts.</div>
          <div className="input-div">
            <input
            className="birthdate-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
            {/* <span className="ln-floating-label">Last name</span> */}
          </div>
          <div className="agree-message">By selecting agree and continue, I agree to Cozybnb's Terms of Service. </div>
          <button type="submit">Agree and continue</button>
        </form>
      </div>
      </div>
      
    </>
    // <>

    //     <form onSubmit={handleSubmit}>
    //     <ul>
    //         {errors.map(error => <li key={error}>{error}</li>)}
    //     </ul>
    //     <label>
    //         Email
    //         <input
    //         type="text"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //         />
    //     </label>
    //     <label>
    //         Username
    //         <input
    //         type="text"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         required
    //         />
    //     </label>
    //     <label>
    //         Password
    //         <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //         />
    //     </label>
    //     <label>
    //         Confirm Password
    //         <input
    //         type="password"
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //         required
    //         />
    //     </label>
    //     <button type="submit">Sign Up</button>
    //     </form>
    // </>
  );
}

export default SignUpForm;