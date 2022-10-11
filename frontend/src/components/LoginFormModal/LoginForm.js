import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
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

  return (
    <>
      <div className="login-modal">
      <header>
        <div><i class="fa-sharp fa-solid fa-xmark"></i></div>
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
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
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
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <button 
        type="submit">Log In</button>
      </form>
      </div>
      
    </>
  );
}

export default LoginForm;