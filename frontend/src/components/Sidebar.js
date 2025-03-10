import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../context/CategoryContext';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

export default function Sidebar() {
  const { categories, loading, error } = useCategories();

  return (
    <div className='sidebar'>
      <h3 className='sidebar-title'>Categories</h3>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <ul className='category-list'>
          {categories.map((category) => (
            <li key={category} className='category-item'>
              <Link to={`/search?category=${category}`}>{category}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
