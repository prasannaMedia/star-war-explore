import React from 'react';

const Pagination = ({ page, setPage, totalPages }) => (
  <div className="mt-4 flex items-center space-x-4">
    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      className={`px-4 py-2 rounded-lg ${page === 1 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
    >
      Previous
    </button>

    <span>Page {page} of {totalPages}</span>

    <button
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)}
      className={`px-4 py-2 rounded-lg ${page === totalPages ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
    >
      Next
    </button>
  </div>
);

export default Pagination;