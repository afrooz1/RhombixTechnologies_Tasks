import React from "react";
import backgroundImage from '../../assets/lib.jpg'; // Adjust the path based on your file structure

const HomePage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use the imported image
      }}
    >
      <div className="bg-[#F8F1E5] bg-opacity-90 p-8 rounded-lg text-center shadow-xl">
        <h1 className="text-4xl font-bold text-[#9B59B6] mb-4">Welcome to Your Personal Library</h1>
        <p className="text-lg text-[#A7C6ED]">
          Organize, Search, and Track Your Books with Ease!
        </p>
      </div>
    </div>
  );
};

export default HomePage;
