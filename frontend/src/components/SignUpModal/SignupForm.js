import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';


function SignUpForm() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector(state => state.session.user);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password) {
        setErrors([]);
        return dispatch(sessionActions.signup({ email, password, birthdate, email, firstName, lastName }))
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



    if (sessionUser) return <Redirect to="/" />;

  return (
    <>
      <div className="signup-modal">
        <div className="login-x-button"><span class="material-symbols-outlined">close</span></div>
      <header className="signup-header">
        <div></div>
        <div >Finish signing up</div>
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
            <span className="fn-floating-label">First name</span>
          </div>
          <div className="input-div">
            <input
            className="lastname-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Last name"
            />
            <span className="ln-floating-label">Last name</span>
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
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
              placeholder="Birthdate"
            />
            <span className="bd-floating-label">Birthdate</span>
          </div>
          <div className="birthdate-message">To sign up, you need to be at least 18. Your birthday won't be shared with other people who use Cozybnb. </div>
          <div className="input-div">
            <input
            className="birthdate-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
            <span className="signupemail-floating-label">Email</span>
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
            <span className="su-password-floating-label">Password</span>
          </div>
          <div className="agree-message">By selecting 
          <span className="bold">  Agree and continue</span>, I agree to Cozybnb's 
          <span className="bold2">Term of Service</span>. 
          <a href="https://www.linkedin.com/in/hanchen28/">LinkIn</a>
          <a href="https://github.com/hannnmc">Github</a>
           </div>
          <button type="submit">Agree and continue</button>
        </form>
      </div>
      </div>
      
    </>
  );
}

export default SignUpForm;