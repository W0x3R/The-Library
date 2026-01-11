const OPEN_LIBRARY_URL = "https://openlibrary.org/search.json";

export const getBooksByQuery = async (query) => {
  if (!query) return [];

  const response = await fetch(
    `${OPEN_LIBRARY_URL}?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("SERVER_ERROR");
  }
  const data = await response.json();
  return data.docs;
};
