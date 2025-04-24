import React, { useState } from 'react';
import Seat from './Seat';

const Seatgrid = ({ numSeats = 25 }) => {
  const [seats, setSeats] = useState(Array.from({ length: numSeats }, (_, index) => ({
    number: index + 1,
    isBooked: false,
  })));
  const [availableSeats, setAvailableSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (seatNumber) => {
    const clickedSeat = seats.find((seat) => seat.number === seatNumber);
    if (clickedSeat && !clickedSeat.isBooked) {
      setSelectedSeat(seatNumber);
      // Generate 10 random available seat numbers (excluding the clicked one)
      const otherAvailableSeats = seats
        .filter((seat) => !seat.isBooked && seat.number !== seatNumber)
        .map((seat) => seat.number);

      const randomAvailable = [];
      const count = Math.min(10, otherAvailableSeats.length);
      const shuffled = [...otherAvailableSeats].sort(() => 0.5 - Math.random());
      randomAvailable.push(...shuffled.slice(0, count));

      setAvailableSeats(randomAvailable);
    }
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))', gap: '5px' }}>
        {seats.map((seat) => (
          <Seat
            key={seat.number}
            number={seat.number}
            isBooked={seat.isBooked}
            onClick={() => handleSeatClick(seat.number)}
          />
        ))}
      </div>
      {selectedSeat && (
        <div style={{ marginTop: '20px' }}>
          <p>Available seats near seat {selectedSeat}:</p>
          <ul>
            {availableSeats.map((seat) => (
              <li key={seat}>{seat}</li>
            ))}
            {availableSeats.length === 0 && <p>No other seats available.</p>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Seatgrid;