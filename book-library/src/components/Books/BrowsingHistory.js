import React, { useEffect, useState } from 'react';

const BrowsingHistory = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('BrowsingHistory')) || [];
    setHistory(storedHistory);

    if (storedHistory.length === 0) {
      setError('No browsing history available.');
    } else {
      setError(''); // Clear error if there is data
    }
  }, []);

  return (
    <div className="bg-white p-6 shadow-md rounded-lg m-6">
      <h2 className="text-2xl font-bold text-[#9B59B6] mb-4">Browsing History</h2>
      {error && (
        <p className="text-gray-500 italic mb-6">
          {error}
        </p>
      )}
      {history.length > 0 && (
        <div className="overflow-y-auto max-h-[70vh]">
          <ul className="space-y-4">
            {history.map((entry, index) => (
              <li
                key={index}
                className="bg-[#F8F1E5] border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-[#9B59B6] truncate mb-2">
                  {entry.book?.title || 'Unknown Book'}
                </h3>
                <p className="text-sm text-gray-600">
                  Searched on{' '}
                  {entry.searched_at
                    ? new Date(entry.searched_at).toLocaleString()
                    : 'Unknown Date'}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BrowsingHistory;
