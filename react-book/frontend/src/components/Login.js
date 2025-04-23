import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from './Alert';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/auth/login', { username, password });
      window.location.href = '/';
    } catch (error) {
      console.error(error);
      setApiError(error?.response?.data?.error || 'Unknown Error');
    }
  };

  return (
    <div className="login-component">
      <Alert visible={!!apiError} type="error">
        <p>There was an error logging in.</p>
        <p>{apiError}</p>
        <p>Please try again.</p>
      </Alert>
      <h2>Welcome Back!</h2>
      <div className="login-container">
        <form onSubmit={login}>
          <div>
            <label htmlFor="username">
              Username
              <input
                type="text"
                id="username"
                value={username}
                autoComplete="username"
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password
              <input
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Log In</button>
          <h4>New Here? Register to our Site</h4>
          <button type="button" onClick={() => navigate('/signup')}>Sign Up</button>
        </form>
      </div>
      <p className="wht-sps" />
    </div>
  );
}

export default Login;
