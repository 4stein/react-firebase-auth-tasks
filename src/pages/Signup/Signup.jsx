import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../services/firebase';

const Signup = ({ addToken }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async e => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        localStorage.setItem('token', user.accessToken);
        addToken();
        console.log(user);
        navigate('/');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="auth">
      <h2> Sign up </h2>
      <form>
        <div className="form-group">
          <label htmlFor="email-address">Email address</label>
          <input
            className="form-control"
            id="email-address"
            type="email"
            label="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            id="password"
            type="password"
            label="Create password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>

        <button className="btn btn-primary" type="submit" onClick={onSubmit}>
          Sign up
        </button>
      </form>

      <p>
        Already have an account? <NavLink to="/">Sign in</NavLink>
      </p>
    </div>
  );
};

export default Signup;
