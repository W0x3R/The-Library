const OPEN_LIBRARY_URL = "https://openlibrary.org/search.json";

/**
 * Fetches books from OpenLibrary Search API by a text query.
 * @param {string} query Search query string
 * @param {AbortSignal} signal AbortController signal for request cancellation
 * @returns {Promise<Array>} Array of book documents
 */
export const getBooksByQuery = async (query, signal) => {
  if (!query) return [];

  const response = await fetch(`${OPEN_LIBRARY_URL}?q=${encodeURIComponent(query)}`, { signal });

  if (!response.ok) {
    throw new Error("SERVER_ERROR");
  }
  const data = await response.json();
  return data.docs;
};
