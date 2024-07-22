import React, { useContext } from 'react';
import { Row, Col, Card, Button } from 'antd';
import { CartContext } from './CartContext';

const { Meta } = Card;

const Premiere = () => {
  const premierMovies = [
    {
      id: 1,
      title: 'Harry potter',
      poster: 'https://cdn.webshopapp.com/shops/70489/files/410415429/600x600x3/image.jpg',
      releaseDate: '2024-07-15',
      price: 10,
      showtime: '2024-07-15 18:00',
      seats: ['A1', 'A2']
    },
    {
      id: 5,
      title: 'Moana 2',
      poster: 'https://play-lh.googleusercontent.com/ECIYR1ZonMdi5TRn8WZjpUeTMgdGCDUGq9QSv8-bkD8T-txovfMt5il7V25guIApTQWR=w240-h480-rw',
      releaseDate: '2024-07-16',
      price: 12,
      showtime: '2024-07-16 20:00',
      seats: ['B1', 'B2']
    },
    {
      id: 4,
      title: 'Inside Out 2',
      poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/Inside_Out_2_poster.jpg/220px-Inside_Out_2_poster.jpg',
      releaseDate: '2024-07-17',
      price: 15,
      showtime: '2024-07-17 19:00',
      seats: ['C1', 'C2']
    },
    {
      id: 3,
      title: 'Kung Fu Panda',
      poster: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Kung_Fu_Panda_4_poster.jpg',
      releaseDate: '2024-07-18',
      price: 20,
      showtime: '2024-07-18 21:00',
      seats: ['D1', 'D2']
    },
    {
      id: 8,
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
      id: 7,
      title: 'Tangled',
      poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9xlLW2FCD5rI6LijAz55GVC_uP082TZw52A&s',
      releaseDate: '2024-07-17',
      price: 15,
      showtime: '2024-07-17 19:00',
      seats: ['C1', 'C2']
    },
    {
      id: 6,
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
    const cartItem = { 
      ...movie, 
      moviename: movie.title, // Transform title to moviename
      showtime: movie.showtime || '2024-07-15 18:00', 
      seats: movie.seats || ['A1', 'A2'] 
    };
    console.log('Adding to cart:', cartItem); // Log to check the cart item
    addToCart(cartItem);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        {premierMovies.map((movie) => (
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

export default Premiere;
