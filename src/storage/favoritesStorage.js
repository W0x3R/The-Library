const FAVORITES_KEY = "favorites";

/**
 * Load favorite books from localStorage.
 * Returns a Map of favorites. If nothing is stored or parsing fails, returns an empty Map.
 */
export const loadFavoritesFromStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem(FAVORITES_KEY));
    if (!data) return new Map();

    return Array.isArray(data) ? new Map(data) : new Map();
  } catch {
    return new Map();
  }
};

/**
 * Save favorite books to localStorage.
 * @param {Map} favoritesMap - Map of favorite books
 */
export const saveFavoritesToStorage = (favoritesMap) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favoritesMap]));
};
