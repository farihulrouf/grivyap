// components/BusinessList.js
import React, { useEffect, useState } from 'react';
import { fetchBusinesses } from '../api/api';

const BusinessList = ({ page, limit }) => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchBusinesses(page, limit, searchCategory, searchName);
        setBusinesses(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchData();
  }, [page, limit, searchCategory, searchName]);

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
    </div>
  );
};

export default BusinessList;
