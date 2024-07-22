import React, { useState } from 'react';
import axios from 'axios';
import { Input, Card, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const SearchBar = () => {
  const [movie, setMovie] = useState(null);

  const handleSearch = async (value) => {
    try {
      const response = await axios.get('http://localhost:5000/api/search-movie', { params: { name: value } });
      if (response.data.success) {
        setMovie(response.data.movie);
      } else {
        setMovie(null);
        message.error(response.data.message);
      }
    } catch (error) {
      console.error('Search error:', error);
      message.error('An error occurred while searching for the movie.');
    }
  };

  return (
    <div>
      <Search
        placeholder="Search for a movie"
        onSearch={handleSearch}
        enterButton={<SearchOutlined />}
        style={{ borderRadius: '25px', width: '300px', margin: '20px 0' }}
      />
      {movie && (
        <Card
          title={movie.name}
          bordered={false}
          style={{ width: '100%', maxWidth: '600px', margin: '20px auto' }}
        >
          <p><strong>Description:</strong> {movie.description}</p>
          <p><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p><strong>Actors:</strong> {movie.actors}</p>
          <p><strong>Views:</strong> {movie.views}</p>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
