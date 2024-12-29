import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import Dashboard from "./components/pages/Dashboard";
import FavoriteBooks from "./components/Books/FavoriteBooks"; 
import BrowsingHistory from "./components/Books/BrowsingHistory";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <div className="bg-[#A7C6ED] min-h-screen">
        {/* Navigation Bar */}
        <nav className="bg-gradient-to-r from-[#9B59B6] to-[#8E44AD] text-white px-6 py-4 flex justify-between items-center sticky top-0 shadow-lg z-50">
          <h1 className="font-extrabold text-2xl tracking-wider">My Library</h1>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-[#F1A7B3] transition duration-300">Home</Link>
            <Link to="/dashboard" className="hover:text-[#F1A7B3] transition duration-300">Dashboard</Link>
            <Link to="/favorites" className="hover:text-[#F1A7B3] transition duration-300">Favorite Books</Link>
            <Link to="/history" className="hover:text-[#F1A7B3] transition duration-300">Browsing History</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? "✖" : "☰"}
          </button>

          {/* Mobile Menu */}
          <div className={`${isOpen ? "block" : "hidden"} absolute top-full left-0 w-full bg-[#8E44AD] rounded-lg shadow-lg md:hidden`}>
            <Link to="/" className="block px-4 py-2 hover:bg-[#9B59B6] hover:text-[#F1A7B3] transition duration-300" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/dashboard" className="block px-4 py-2 hover:bg-[#9B59B6] hover:text-[#F1A7B3] transition duration-300" onClick={() => setIsOpen(false)}>Dashboard</Link>
            <Link to="/favorites" className="block px-4 py-2 hover:bg-[#9B59B6] hover:text-[#F1A7B3] transition duration-300" onClick={() => setIsOpen(false)}>Favorite Books</Link>
            <Link to="/history" className="block px-4 py-2 hover:bg-[#9B59B6] hover:text-[#F1A7B3] transition duration-300" onClick={() => setIsOpen(false)}>Browsing History</Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/favorites" element={<FavoriteBooks />} />
          <Route path="/history" element={<BrowsingHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
