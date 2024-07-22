import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Row, Col, Card, Button } from 'antd';
import { CartContext } from './CartContext';

const { Meta } = Card;


const MovieList = () => {
  const movies = [
    {
      id: 1,
      title: 'Inception',
      poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmkq35zEZtIgZWAHKWdGD_IRMUx-c9EOgrcQ&s',
      releaseDate: '2024-07-15',
      price: 10,
      showtime: '2024-07-15 18:00',
      seats: ['A1', 'A2']
    },
    {
      id: 2,
      title: 'Frozen 2',
      poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_LTcGWSZReMzCTRxSu5JRFkxnPsB1uv3Tpg&s',
      releaseDate: '2024-07-16',
      price: 12,
      showtime: '2024-07-16 20:00',
      seats: ['B1', 'B2']
    },
    {
      id: 3,
      title: 'Tangled',
      poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9xlLW2FCD5rI6LijAz55GVC_uP082TZw52A&s',
      releaseDate: '2024-07-17',
      price: 15,
      showtime: '2024-07-17 19:00',
      seats: ['C1', 'C2']
    },
    {
      id: 4,
      title: 'Spider-Man',
      poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiaf9Vyg6YYSiW2k_nK5YtrAJjRLknWpwpAA&s',
      releaseDate: '2024-07-18',
      price: 20,
      showtime: '2024-07-18 21:00',
      seats: ['D1', 'D2']
    },
  ];

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (movie) => {
    // Add movie to cart with dummy values for showtime and seats if not already present
    const cartItem = { ...movie, showtime: movie.showtime || '2024-07-15 18:00', seats: movie.seats || ['A1', 'A2'] };
    addToCart(cartItem);
  };
  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        {movies.map((movie) => (
          <Col key={movie.id} xs={24} sm={12} md={6} lg={6}>
            <Card
              hoverable
              style={{ marginBottom: 20 }}
              cover={<img alt={movie.title} src={movie.poster} style={{ height: '400px', objectFit: 'cover' }} />}
            >
              <Meta title={movie.title} description={`Released: ${movie.releaseDate}`} />
              <div style={{ marginTop: 10 }}>
                
              <Button type="primary" onClick={() => handleAddToCart(movie)}>
                  Add to Cart
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MovieList;
