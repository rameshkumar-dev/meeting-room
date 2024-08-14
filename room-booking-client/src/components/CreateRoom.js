import React, { useState } from 'react';
import axios from 'axios';

function CreateRoom() {
  const [roomNo, setRoomNo] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/room/create', {
        roomNo,
        type,
      },{withCredentials:true});
      setMessage(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Create Room</h1>
      <input
        type="text"
        placeholder="Room No"
        value={roomNo}
        onChange={(e) => setRoomNo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <button onClick={handleCreate}>Create Room</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateRoom;
