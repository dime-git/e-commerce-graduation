import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    navigate('/signin');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(searchQuery ? `/search/?query=${searchQuery}` : '/search');
  };

  return (
    <header className='header'>
      <div className='header-content'>
        <Link to='/' className='brand'>
          Brendy
        </Link>

        <div className='search-container'>
          <form className='search-form' onSubmit={submitHandler}>
            <input
              type='text'
              className='search-input'
              placeholder='Search products...'
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type='submit' className='search-button'>
              <i className='fas fa-search'></i>
            </button>
          </form>
        </div>

        <div className='nav-links'>
          <Link to='/cart' className='nav-link'>
            <i className='fas fa-shopping-cart'></i>
            Cart
            {cart.cartItems.length > 0 && (
              <span className='cart-badge'>
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </span>
            )}
          </Link>

          {userInfo ? (
            <div className='dropdown'>
              <Link to='#' className='nav-link'>
                <i className='fas fa-user'></i>
                {userInfo.name}
              </Link>
              <div className='dropdown-content'>
                <Link to='/profile' className='dropdown-item'>
                  User Profile
                </Link>
                <Link to='/orderhistory' className='dropdown-item'>
                  Order History
                </Link>
                <Link
                  to='#signout'
                  onClick={signoutHandler}
                  className='dropdown-item'
                >
                  Sign Out
                </Link>
              </div>
            </div>
          ) : (
            <Link to='/signin' className='nav-link'>
              <i className='fas fa-sign-in-alt'></i>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
