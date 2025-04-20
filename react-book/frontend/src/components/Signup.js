import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from './Alert';
import CurrentUserContext from '../contexts/CurrentUserContext';
import './Login.css'; // Reuse existing CSS

function Signup() {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();

  const signup = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post('/api/auth/signup', {
        username,
        email,
        password,
      });
      setCurrentUser(result.data);
      navigate('/');
    } catch (error) {
      console.error(error);
      setApiError(error?.response?.data?.error || 'Unknown error');
    }
  };

  return (
    <div className="login-component">
      <Alert visible={!!apiError} type="error">
        <p>There was an error signing up.</p>
        <p>{ apiError }</p>
        <p>Please try again.</p>
      </Alert>
      <h2>Create Your Account</h2>
      <div className="login-container">
        <form onSubmit={signup}>
          <div>
            <label htmlFor="username">
              Username
              <input
                type="text"
                id="username"
                value={username}
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              Email
              <input
                type="email"
                id="email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
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
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Sign Up</button>
          <h4>Already a user? Go to Login</h4>
          <button type="button" onClick={() => navigate('/login')}>Log In</button>
        </form>
      </div>
      <p className="wht-sps" />
    </div>
  );
}

export default Signup;
