import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CompanyLogo from '../images/pathfinder.png';
import CartIcon from '../images/cart.svg';
import UserDetails from './UserDetails';
import './Header.css';

function Header({ cart }) {
  const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header className="header-component">
      <Link to="/" className="brand-link">
        <img src={CompanyLogo} alt="Pathfinder Logo" className="logo" />
        <h1 className="brand-name">Pathfinder</h1>
      </Link>
      <div className="search-bar">
        <input type="text" placeholder="Search..." className="search-input" />
        <button type="button" className="search-button">Search</button>
      </div>
      <div className="menu">
        <Link to="/cart" className="cart-link">
          My Cart
          <img src={CartIcon} alt="Cart" className="cart-icon" />
          <div className="cart-badge">{cartQuantity}</div>
        </Link>
        <UserDetails />
      </div>
    </header>
  );
}

// PropTypes for type-checking
Header.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      itemId: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Header;
