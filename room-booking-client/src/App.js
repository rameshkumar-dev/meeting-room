import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import ViewRoom from './components/ViewRoom';
import SearchRoom from './components/SearchRoom';
import BookRoom from './components/BookRoom';
import CreateRoom from './components/CreateRoom';

function App() {

  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<ViewRoom />} />
        <Route path="/search" element={<SearchRoom />} />
        <Route path="/book" element={<BookRoom />} />
        <Route path="/create" element={<CreateRoom />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
