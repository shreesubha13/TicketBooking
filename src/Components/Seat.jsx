import React from 'react';

const Seat = ({ number, isBooked, onClick }) => {
  const seatClass = `seat ${isBooked ? 'booked' : 'available'}`;

  return (
    <div className={seatClass} onClick={onClick}>
      {number}
    </div>
  );
};

export default Seat;
