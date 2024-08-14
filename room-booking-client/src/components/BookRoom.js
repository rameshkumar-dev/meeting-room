import React, { useState } from 'react';
import axios from 'axios';

function BookRoom() {
  const [roomNo, setRoomNo] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState({ checkInTime: '', checkOutTime: '' });
  const [message, setMessage] = useState('');

  const handleBooking = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/room/book', {
        roomNo,
        date,
        timeSlot: [timeSlot],
      },{withCredentials: true});
      setMessage(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Book Room</h1>
      <input
        type="text"
        placeholder="Room No"
        value={roomNo}
        onChange={(e) => setRoomNo(e.target.value)}
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        placeholder="Check-In Time"
        value={timeSlot.checkInTime}
        onChange={(e) => setTimeSlot({ ...timeSlot, checkInTime: e.target.value })}
      />
      <input
        type="time"
        placeholder="Check-Out Time"
        value={timeSlot.checkOutTime}
        onChange={(e) => setTimeSlot({ ...timeSlot, checkOutTime: e.target.value })}
      />
      <button onClick={handleBooking}>Book Room</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default BookRoom;
