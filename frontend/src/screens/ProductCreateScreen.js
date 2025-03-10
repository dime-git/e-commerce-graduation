import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ProductCreateScreen = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [numReviews, setNumReviews] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Create the product data object with all required fields
      const productData = {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        rating: rating || 0, // Ensure rating is included
        numReviews: numReviews || 0, // Ensure numReviews is included
      };

      // Send the request
      const { data } = await axios.post('/api/products', productData, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      toast.success('Product created successfully');
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Error creating product');
    } finally {
      setLoading(false);
    }
  };

  return <div>{/* Render your form here */}</div>;
};

export default ProductCreateScreen;
