import React from 'react';
import { Button, Space } from 'antd';

const CartSummary = () => {
  // Dummy data for selected movies
  const selectedMovies = [
    {
      id: 1,
      title: 'Movie 1',
      poster: 'https://via.placeholder.com/150',
      showtime: '2024-07-15 14:30',
      seats: ['A1', 'A2', 'A3'],
      price: 10,
    },
    {
      id: 2,
      title: 'Movie 2',
      poster: 'https://via.placeholder.com/150',
      showtime: '2024-07-16 16:00',
      seats: ['B1', 'B2'],
      price: 8,
    },
  ];

  const handleRemoveMovie = (movieId) => {
    // Implement logic to remove movie from cart
    console.log(`Removing movie with ID ${movieId}`);
  };

  return (
    <div>
      {selectedMovies.map((movie) => (
        <div key={movie.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <img src={movie.poster} alt={movie.title} style={{ width: '150px', height: 'auto', marginRight: '10px' }} />
          <div>
            <h3>{movie.title}</h3>
            <p>Showtime: {movie.showtime}</p>
            <p>Seats: {movie.seats.join(', ')}</p>
            <p>Pricing: ${movie.price}</p>
            <Button type="link" danger onClick={() => handleRemoveMovie(movie.id)}>
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartSummary;
