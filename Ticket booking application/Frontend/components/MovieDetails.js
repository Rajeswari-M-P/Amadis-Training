// components/MovieDetails.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Card, Spin, message } from 'antd';

const MovieDetails = () => {
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Extract movie name from location search parameters
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name'); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      console.log('Fetching details for movie:', name); // Debugging log
  
      if (!name) {
        message.error('Movie name is required');
        setLoading(false); // Ensure loading is set to false
        return;
      }
      
      try {
        const response = await axios.get(`http://localhost:5000/movies?name=${name}`);
        console.log('API Response:', response); // Debugging log
  
        if (response.data.success) {
          setMovie(response.data.movie);
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
        message.error('Error fetching movie details');
      } finally {
        setLoading(false);
      }
    };
  
    fetchMovieDetails();
  }, [name]);
  
  if (loading) return <Spin size="large" />;

  return (
    <div style={{ padding: '20px' }}>
      {movie ? (
        <Card
          title={movie.name}
          bordered={false}
          style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}
        >
          <p><strong>Description:</strong> {movie.description}</p>
          <p><strong>Release Date:</strong> {new Date(movie.releasedate).toLocaleDateString()}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p><strong>Actors:</strong> {movie.actors}</p>
          <p><strong>Views:</strong> {movie.views}</p>
        </Card>
      ) : (
        <p>No movie details found</p>
      )}
    </div>
  );
};

export default MovieDetails;

