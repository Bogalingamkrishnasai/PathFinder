import axios from 'axios';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { CartTypes } from '../reducers/cartReducer';
import Profile from '../images/UserIcon.png';
import './UserDetails.css';

function UserDetails({ dispatch }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {});
      setCurrentUser({});
      if (dispatch) dispatch({ type: CartTypes.EMPTY });
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-details-component">
      {currentUser.username ? (
        <div className="user-info">
          {currentUser.access === 'associate' && (
            <Link to="/orders" className="orders-link">Orders</Link>
          )}
          <img src={Profile} alt="profile" className="profile-icon" />
          <p className="username">{currentUser.username}</p>
          <button type="button" onClick={logout} className="logout-button">
            Log Out
          </button>
        </div>
      ) : (
        <Link to="/login" className="login-link">Log In</Link>
      )}
    </div>
  );
}

UserDetails.propTypes = {
  dispatch: PropTypes.func,
};

UserDetails.defaultProps = {
  dispatch: null,
};

export default UserDetails;
