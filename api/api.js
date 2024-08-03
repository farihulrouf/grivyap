// api/api.js
export const fetchBusinesses = async (page, limit, category, name) => {
  try {
    const response = await fetch(`https://data-grivy.vercel.app/api/business?page=${page}&limit=${limit}&category=${category}&name=${name}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();

    // Periksa apakah data memiliki properti businesses yang merupakan array
    if (data && Array.isArray(data.businesses)) {
      return data.businesses; // Mengembalikan array businesses
    } else {
      throw new Error('Data is not in expected format');
    }
  } catch (error) {
    console.error('Failed to fetch businesses:', error);
    throw error;
  }
};
