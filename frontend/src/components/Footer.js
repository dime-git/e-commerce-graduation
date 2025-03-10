import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-section'>
          <h3 className='footer-title'>Brendy</h3>
          <p className='footer-description'>
            Your one-stop shop for all your shopping needs. Quality products at
            affordable prices.
          </p>
          <div className='social-links'>
            <a href='#' className='social-link'>
              <i className='fab fa-facebook-f'></i>
            </a>
            <a href='#' className='social-link'>
              <i className='fab fa-twitter'></i>
            </a>
            <a href='#' className='social-link'>
              <i className='fab fa-instagram'></i>
            </a>
            <a href='#' className='social-link'>
              <i className='fab fa-pinterest'></i>
            </a>
          </div>
        </div>

        <div className='footer-section'>
          <h3 className='footer-title'>Quick Links</h3>
          <ul className='footer-links'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/search'>Shop</Link>
            </li>
            <li>
              <Link to='/about'>About Us</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
          </ul>
        </div>

        <div className='footer-section'>
          <h3 className='footer-title'>Customer Service</h3>
          <ul className='footer-links'>
            <li>
              <Link to='/faq'>FAQ</Link>
            </li>
            <li>
              <Link to='/shipping'>Shipping Policy</Link>
            </li>
            <li>
              <Link to='/returns'>Returns & Refunds</Link>
            </li>
            <li>
              <Link to='/privacy'>Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div className='footer-section'>
          <h3 className='footer-title'>Newsletter</h3>
          <p className='footer-description'>
            Subscribe to our newsletter for the latest updates and offers.
          </p>
          <form className='newsletter-form'>
            <input
              type='email'
              placeholder='Your email address'
              className='newsletter-input'
            />
            <button type='submit' className='newsletter-button'>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>&copy; {new Date().getFullYear()} Brendy. All rights reserved.</p>
        <div className='payment-methods'>
          <i className='fab fa-cc-visa'></i>
          <i className='fab fa-cc-mastercard'></i>
          <i className='fab fa-cc-amex'></i>
          <i className='fab fa-cc-paypal'></i>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
