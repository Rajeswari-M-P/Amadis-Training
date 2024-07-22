const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const CartItem = require('../models/cartitems'); // Adjust the import as needed

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'customer',
  password: 'qwert@123',
  port: 5432,
});

// Route to handle cart checkout
router.post('/cartitems', async (req, res) => {
  const items = req.body;

  try {
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items to checkout' });
    }

    // Save the cart items to the database
    const createdItems = await CartItem.bulkCreate(items);
    res.status(201).json({ success: true, message: 'Checkout successful', items: createdItems });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ success: false, message: 'Server error during checkout' });
  }
});

module.exports = router;
