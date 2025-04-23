import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { itemImages } from '../items';
import ItemType from '../types/item';
import './DetailItem.css';

function DetailItem({ addToCart, items }) {
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const detailItem = items.find((item) => item.itemId === id);

  const handleAddToCart = () => {
    if (!currentUser?.username) {
      navigate('/login');
      return;
    }
    addToCart(detailItem.itemId);
  };

  return (
    <div className="detail-item-component">
      {detailItem ? (
        <>
          <img
            className="details-image"
            src={itemImages[detailItem.imageId]}
            alt={detailItem.title}
          />
          <h2>{detailItem.title}</h2>
          {detailItem.description && <h6>{detailItem.description}</h6>}
          <div>
            $
            {(detailItem.salePrice ?? detailItem.price).toFixed(2)}
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </>
      ) : <h2>Unknown Item</h2>}
    </div>
  );
}

DetailItem.propTypes = {
  addToCart: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default DetailItem;
