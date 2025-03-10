import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { Store } from '../Store';
import axios from 'axios';

function Product({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
  };

  return (
    <div className='product'>
      <div className='product-image-container'>
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className='product-image'
          />
        </Link>
      </div>

      <div className='product-info'>
        <Link to={`/product/${product.slug}`} className='product-name'>
          {product.name}
        </Link>

        <Rating rating={product.rating} numReviews={product.numReviews} />

        <div className='product-price'>${product.price}</div>

        <button
          onClick={addToCartHandler}
          className='add-to-cart'
          disabled={product.countInStock === 0}
        >
          {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default Product;
