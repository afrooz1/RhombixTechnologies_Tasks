import React, { useEffect, useState } from 'react';

const FavoriteBooks = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load favorites from local storage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);

    if (storedFavorites.length === 0) {
      setError('No favorite books added yet.');
    }
  }, []);

  const handleDelete = (index) => {
    // Remove the book at the given index
    const updatedFavorites = favorites.filter((_, i) => i !== index);

    // Update local storage and state
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);

    if (updatedFavorites.length === 0) {
      setError('No favorite books added yet.');
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg m-6">
      <h2 className="text-2xl font-bold text-[#9B59B6] mb-4">Your Favorite Books</h2>
      {error && (
        <div className="text-gray-500 italic mb-6 text-center">
          <p>{error}</p>
          <button
            onClick={() => setError('')} // Clear the error manually
            className="mt-4 bg-[#A7C6ED] text-white px-4 py-2 rounded hover:bg-[#8ABBEA] transition"
          >
            Add Favorites
          </button>
        </div>
      )}
      {favorites.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((book, index) => (
            <div
              key={index}
              className="bg-[#F8F1E5] border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold text-[#9B59B6] truncate mb-2">
                {book.title || 'Untitled'}
              </h3>
              <p className="text-sm text-gray-600 truncate mb-2">
                By {book.authors ? book.authors.join(', ') : 'Unknown Author'}
              </p>
              {book.thumbnail && (
                <img
                  src={book.thumbnail}
                  alt={`${book.title} book cover`}
                  className="w-full h-auto rounded mb-4"
                />
              )}
              <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                {book.description || 'No description available.'}
              </p>
              <button
                onClick={() => handleDelete(index)}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteBooks;
