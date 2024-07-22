// ShowtimeList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShowtimeList = () => {
  const { movieId } = useParams();
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    const fetchShowtimes = async () => {
      const response = await axios.get(`/api/movie/${movieId}/showtimes`);
      setShowtimes(response.data);
    };
    fetchShowtimes();
  }, [movieId]);

  return (
    <div>
      <h2>Showtimes</h2>
      {showtimes.map(showtime => (
        <div key={showtime.id}>
          <h3>{showtime.time}</h3>
        </div>
      ))}
    </div>
  );
};

export default ShowtimeList;
