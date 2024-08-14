import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    // Function to fetch the access token
    const fetchAccessToken = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/index/access-token",
          { withCredentials: true }
        );
        if (response.status === 200) {
          console.log("----------", response);
          localStorage.setItem("accessToken", response.token);
        } else {
          console.error("Failed to fetch access token");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAccessToken();
  }, []);

  return (
    <div>
      <h1>Room Management System</h1>
      <nav>
        <ul>
          <li>
            <Link to="/view">View Room</Link>
          </li>
          <li>
            <Link to="/search">Search Room</Link>
          </li>
          <li>
            <Link to="/book">Book Room</Link>
          </li>
          <li>
            <Link to="/create">Create Room</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
