// components/BusinessList.js
import React, { useEffect, useState } from 'react';
import { fetchBusinesses } from '../api/api';

const BusinessList = ({ page, limit, category, name }) => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchBusinesses(page, limit, category, name);
        setBusinesses(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchData();
  }, [page, limit, category, name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {businesses.length > 0 ? (
        businesses.map((business) => (
          <div key={business._id} className="border p-4 mb-4">
            <h2 className="text-xl font-bold">{business.name}</h2>
            <p><strong>Business Name:</strong> {business.businessName}</p>
            <p><strong>Address:</strong> {business.fullAddress}</p>
            <p><strong>Social Media:</strong> <a href={business.socialMediaUrl} target="_blank" rel="noopener noreferrer">{business.socialMediaUrl}</a></p>
            <p><strong>WhatsApp:</strong> {business.whatsappNumber}</p>
            <p><strong>Category:</strong> {business.category}</p>
            {business.businessPhoto && <img src={business.businessPhoto} alt="Business" className="w-32 h-32 object-cover" />}
            {business.productPhoto && <img src={business.productPhoto} alt="Product" className="w-32 h-32 object-cover" />}
          </div>
        ))
      ) : (
        <p>No businesses found.</p>
      )}
    </div>
  );
};

export default BusinessList;
