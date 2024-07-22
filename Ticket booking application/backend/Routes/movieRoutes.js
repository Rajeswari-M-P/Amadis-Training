const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const { Op } = require('sequelize'); // Import Op for the case-insensitive search
const Movie = require('../models/movies'); // Adjust the import as needed

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'customer',
  password: 'qwert@123',
  port: 5432,
});

// Route to get movie details by name
router.get('/movies', async (req, res) => {
  const { name } = req.query;

  try {
    if (!name) {
      return res.status(400).json({ success: false, message: 'Movie name is required' });
    }

    // Find the movie by name
    const movie = await Movie.findOne({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, // Case-insensitive search
        }
      }
    });

    if (movie) {
      res.json({ success: true, movie });
    } else {
      res.json({ success: false, message: 'No movie found' });
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).json({ success: false, message: 'Error fetching movie details' });
  }
});

module.exports = router;
