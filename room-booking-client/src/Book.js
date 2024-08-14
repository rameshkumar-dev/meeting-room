import React, { useState } from 'react';

function Book({ token }) {
  const [roomId, setRoomId] = useState('');
  const [date, setDate] = useState('');
  const [timeSlots, setTimeSlots] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      roomId,
      date,
      timeSlots: timeSlots.split(',').map(slot => slot.trim())
    };

    fetch('http://localhost:3001/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(bookingData)
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
      });
  };

  return (
    <div>
      <h2>Book a Room</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Room ID:</label>
          <input type="text" value={roomId} onChange={e => setRoomId(e.target.value)} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Time Slots (comma separated):</label>
          <input type="text" value={timeSlots} onChange={e => setTimeSlots(e.target.value)} required />
        </div>
        <button type="submit">Book</button>
      </form>
    </div>
  );
}

export default Book;
