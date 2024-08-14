import React, { useState } from 'react';
import axios from 'axios';

function ViewRoom() {
  const [roomId, setRoomId] = useState('');
  const [roomDetails, setRoomDetails] = useState(null);

  const handleView = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/room/view/${roomId}`,{ withCredentials: true });
      setRoomDetails(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>View Room</h1>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={handleView}>View Room</button>
      {roomDetails && (
        <div>
          <h2>Room Details</h2>
          <p>{JSON.stringify(roomDetails)}</p>
        </div>
      )}
    </div>
  );
}

export default ViewRoom;
