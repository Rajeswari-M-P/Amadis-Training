// SeatSelection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SeatSelection = () => {
  const { showtimeId } = useParams();
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      const response = await axios.get(`/api/showtimes/${showtimeId}/seats`);
      setSeats(response.data);
    };
    fetchSeats();
  }, [showtimeId]);

  return (
    <div>
      <h2>Select Seats</h2>
      {seats.map(seat => (
        <button key={seat.id} disabled={seat.booked}>{seat.number}</button>
      ))}
    </div>
  );
};

export default SeatSelection;
