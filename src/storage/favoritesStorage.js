const FAVORITES_KEY = "favorites";

export const loadFavoritesFromStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem(FAVORITES_KEY));
    if (!data) return new Map();

    return Array.isArray(data) ? new Map(data) : new Map();
  } catch {
    return new Map();
  }
};

export const saveFavoritesToStorage = (favoritesMap) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favoritesMap]));
};
