import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { getError } from '../utils';

const CategoryContext = createContext();

const initialState = {
  categories: [],
  loading: true,
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, categories: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_CATEGORY':
      // Only add if the category doesn't already exist
      if (!state.categories.includes(action.payload)) {
        return { ...state, categories: [...state.categories, action.payload] };
      }
      return state;
    default:
      return state;
  }
}

export function CategoryProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/products/categories');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchCategories();
  }, []);

  // Function to add a new category
  const addCategory = (category) => {
    dispatch({ type: 'ADD_CATEGORY', payload: category });
  };

  return (
    <CategoryContext.Provider value={{ ...state, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategories = () => {
  return useContext(CategoryContext);
};
