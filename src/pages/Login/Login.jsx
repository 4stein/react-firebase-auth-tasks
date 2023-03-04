import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';

import { auth } from '../../services/firebase';

const Login = ({ addToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem('token', user.accessToken);
        addToken();
        navigate('/');
        console.log(user);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="auth">
      <h2>Login</h2>

      <form>
        <div className="form-group">
          <label htmlFor="email-address">Email address</label>
          <input
            className="form-control"
            id="email-address"
            name="email"
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button className="btn btn-primary" onClick={onLogin}>
            Login
          </button>
        </div>
      </form>

      <p className="text-sm text-center">
        No account yet? <NavLink to="/signup">Sign up</NavLink>
      </p>
    </div>
  );
};

export default Login;
