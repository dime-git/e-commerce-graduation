import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function CategoriesSidebar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products/categories');
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Get current category from URL
  const currentCategory = new URLSearchParams(location.search).get('category');

  return (
    <div className='sidebar'>
      <h3 className='categories-title'>Categories</h3>

      {loading ? (
        <div className='loading-spinner'></div>
      ) : error ? (
        <div className='error-message'>{error}</div>
      ) : (
        <ul className='categories-list'>
          <li className='category-item'>
            <Link
              to='/'
              className={`category-link ${!currentCategory ? 'active' : ''}`}
            >
              <i className='fas fa-home'></i>
              All Products
              <span className='category-count'>
                {categories.reduce((a, c) => a + c.count, 0)}
              </span>
            </Link>
          </li>

          {categories.map((category) => (
            <li key={category.name} className='category-item'>
              <Link
                to={`/search?category=${category.name}`}
                className={`category-link ${
                  currentCategory === category.name ? 'active' : ''
                }`}
              >
                <i className={getCategoryIcon(category.name)}></i>
                {category.name}
                <span className='category-count'>{category.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Helper function to get icon based on category name
function getCategoryIcon(category) {
  const icons = {
    Electronics: 'fas fa-laptop',
    Shirts: 'fas fa-tshirt',
    Pants: 'fas fa-socks',
    Shoes: 'fas fa-shoe-prints',
    Watches: 'fas fa-clock',
    Furniture: 'fas fa-couch',
    Books: 'fas fa-book',
    Sports: 'fas fa-futbol',
    Beauty: 'fas fa-spa',
    Health: 'fas fa-heartbeat',
    Toys: 'fas fa-gamepad',
    Kitchen: 'fas fa-utensils',
  };

  return icons[category] || 'fas fa-tag';
}

export default CategoriesSidebar;
