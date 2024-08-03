// api/api.js
export const fetchBusinesses = async (page, limit, category, name) => {
  try {
    const response = await fetch(`https://data-grivy.vercel.app/api/business?page=${page}&limit=${limit}&category=${category}&name=${name}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Ensure the data matches the structure you expect
  } catch (error) {
    throw new Error(`Fetching businesses failed: ${error.message}`);
  }
};
