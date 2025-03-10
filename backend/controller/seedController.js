import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const seedController = async (req, res) => {
  try {
    // Delete existing data
    await Product.deleteMany({});
    await User.deleteMany({});

    // Insert new data
    const createdUsers = await User.insertMany(data.users);
    const createdProducts = await Product.insertMany(data.products);

    console.log('Database seeded successfully!');
    res.send({
      message: 'Seeded successfully',
      users: createdUsers,
      products: createdProducts,
    });
  } catch (error) {
    console.error('Seed error:', error.message);
    res.status(500).send({ message: error.message });
  }
};
