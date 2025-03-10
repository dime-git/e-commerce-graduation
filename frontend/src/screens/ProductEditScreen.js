import React, { useState } from 'react';
import axios from 'axios';

const ProductEditScreen = () => {
  const [userInfo, setUserInfo] = useState({ token: '' });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [image, setImage] = useState('');

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadLoading(true);

      const { data } = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      // Handle both Cloudinary URLs and local file paths
      const imageUrl = data.secure_url.startsWith('http')
        ? data.secure_url
        : `${window.location.origin}${data.secure_url}`;

      setImage(imageUrl);
      setUploadLoading(false);
    } catch (error) {
      setUploadError(error.response?.data?.message || 'Could not upload image');
      setUploadLoading(false);
    }
  };

  return <div>{/* Render your component content here */}</div>;
};

export default ProductEditScreen;
