import React, { useState } from 'react';

const BookSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Search query cannot be empty.');
      setBooks([]);
      return;
    }

    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          searchQuery
        )}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data from Google Books API.');
      }

      const data = await response.json();
      setBooks(data.items || []);
      saveToBrowsingHistory(searchQuery);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('An error occurred while fetching data. Please try again.');
    }
  };

  const saveToBrowsingHistory = (query) => {
    const history = JSON.parse(localStorage.getItem('BrowsingHistory')) || [];
    const newEntry = {
      book: { title: query },
      searched_at: new Date().toISOString(),
    };

    history.push(newEntry);
    localStorage.setItem('BrowsingHistory', JSON.stringify(history));
  };

  const handleAddToFavorites = (book) => {
    const favoriteBook = {
      title: book.volumeInfo.title || 'No Title',
      authors: book.volumeInfo.authors || ['Unknown Author'],
      description: book.volumeInfo.description || 'No Description',
      thumbnail: book.volumeInfo.imageLinks?.thumbnail || '',
    };

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isBookFavorite = favorites.some(fav => fav.title === favoriteBook.title);

    if (isBookFavorite) {
      setError('This book is already in your favorites.');
      return;
    }

    favorites.push(favoriteBook);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setSuccessMessage('Book added to favorites!');
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleClose = () => {
    setSelectedBook(null);
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#9B59B6] mb-6">Search Books</h2>
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for books..."
          className="border border-gray-300 rounded-lg px-4 py-2 flex-grow focus:ring-2 focus:ring-[#A7C6ED] outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-[#F1A7B3] text-white px-6 py-2 rounded-lg hover:bg-[#F1909B] transition duration-300"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-[#F8F1E5] rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 cursor-pointer"
            onClick={() => handleBookClick(book)}
          >
            <h3 className="text-lg font-bold text-[#9B59B6] truncate">
              {book.volumeInfo.title || 'No Title'}
            </h3>
            <p className="text-sm text-gray-600 truncate">
              {book.volumeInfo.authors
                ? book.volumeInfo.authors.join(', ')
                : 'Unknown Author'}
            </p>
            {book.volumeInfo.imageLinks?.thumbnail && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={`${book.volumeInfo.title} cover`}
                className="w-full h-auto mt-4"
              />
            )}
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] rounded-lg shadow-lg overflow-auto p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4 text-[#9B59B6]">
              {selectedBook.volumeInfo.title || 'No Title'}
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              By{' '}
              {selectedBook.volumeInfo.authors
                ? selectedBook.volumeInfo.authors.join(', ')
                : 'Unknown Author'}
            </p>
            {selectedBook.volumeInfo.imageLinks?.thumbnail && (
              <img
                src={selectedBook.volumeInfo.imageLinks.thumbnail}
                alt={`${selectedBook.volumeInfo.title} cover`}
                className="w-full h-auto mb-6"
              />
            )}
            <p className="text-gray-700 text-sm mb-6">
              {selectedBook.volumeInfo.description || 'No description available for this book.'}
            </p>
            <button
              onClick={() => handleAddToFavorites(selectedBook)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 w-full"
            >
              Add to Favorites
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
