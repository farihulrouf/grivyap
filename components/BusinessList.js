// components/BusinessList.js
import React, { useEffect, useState } from 'react';
import { fetchBusinesses } from '../api/api';

const BusinessList = ({ initialPage = 1, limit }) => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchBusinesses(page, limit, searchCategory, searchName);
        if (response && response.businesses && Array.isArray(response.businesses)) {
          setBusinesses(response.businesses);
          setTotalPages(response.totalPages || 1); // Set default to 1 if totalPages is undefined
        } else {
          setBusinesses([]);
          setTotalPages(1);
        }
      } catch (err) {
        setError(err);
        setBusinesses([]);
        setTotalPages(1);
      }
      setLoading(false);
    };

    fetchData();
  }, [page, limit, searchCategory, searchName]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {/* Input fields for filtering */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border p-2 mr-2"
        />
        <select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="border p-2"
        >
          <option value="">Select category</option>
          <option value="Makanan">Makanan</option>
          <option value="Elektronik">Elektronik</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      {businesses.length > 0 ? (
        businesses.map((business) => (
          <div key={business._id} className="border p-4 mb-4 flex justify-between">
            <div className=''>
              <h2 className="text-xl font-bold">{business.name}</h2>
              <p><strong>Business Name:</strong> {business.businessName}</p>
              <p><strong>Address:</strong> {business.fullAddress}</p>
              <p><strong>Social Media:</strong> <a href={business.socialMediaUrl} target="_blank" rel="noopener noreferrer">{business.socialMediaUrl}</a></p>
              <p><strong>WhatsApp:</strong> {business.whatsappNumber}</p>
              <p><strong>Category:</strong> {business.category}</p>
            </div>
            {business.businessPhoto && <img src={business.businessPhoto} alt="Business" className="w-32 h-32 object-cover" />}
            {/*{business.productPhoto && <img src={business.productPhoto} alt="Product" className="w-32 h-32 object-cover" />}*/}
          </div>
        ))
      ) : (
        <p>No businesses found.</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="border px-4 py-2 mx-1"
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map(num => (
          <button
            key={num + 1}
            onClick={() => handlePageChange(num + 1)}
            className={`border px-4 py-2 mx-1 ${page === num + 1 ? 'bg-blue-500 text-white' : ''}`}
          >
            {num + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="border px-4 py-2 mx-1"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BusinessList;
