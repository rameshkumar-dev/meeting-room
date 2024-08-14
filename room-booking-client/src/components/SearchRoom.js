import React, { useState } from 'react';
import axios from 'axios';

function SearchRoom() {
  const [searchParams, setSearchParams] = useState({});
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/room/search', { params: searchParams },{ withCredentials : true});
      console.log(response.data.data);
      setResults(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Search Room</h1>
      <input
        type="text"
        placeholder="Room No"
        onChange={(e) => setSearchParams({ ...searchParams, roomNo: e.target.value })}
      />
      <input
        type="text"
        placeholder="Type"
        onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
      />
      <input
        type="text"
        placeholder="Status"
        onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
      />
      <button onClick={handleSearch}>Search Room</button>
      {results.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {results.map((room) => (
              <li key={room._id}>{JSON.stringify(room)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchRoom;
