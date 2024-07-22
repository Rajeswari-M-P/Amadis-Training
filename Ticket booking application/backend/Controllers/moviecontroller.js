const Movie = require('../models/movies');

const getMovie = async (req, res) => {
  const { name } = req.query; // Use req.query to get query parameters

  try {
    // Find a movie by its name
    const movie = await Movie.findOne({
      where: { name: {name} }
    });

    if (movie) {
      res.status(200).json({ success: true, movie });
    } else {
      res.status(404).json({ success: false, message: 'Movie not found' });
    }
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getMovie };
