import React, { useState, useEffect } from 'react';

function Search({ token }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/search', {
      headers: {
        'Authorization': token
      }
    })
      .then(response => response.json())
      .then(data => setRooms(data));
  }, [token]);

  return (
    <div>
      <h2>Search Rooms</h2>
      <ul>
        {rooms.map(room => (
          <li key={room._id}>{room.name}: {room.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
