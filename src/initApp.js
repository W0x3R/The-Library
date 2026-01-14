import { loadFavoritesFromStorage } from "./storage/favoritesStorage";
import { renderFavorites } from "./ui/books/favorites";
import { initSearchFromUrl } from "./ui/search";
import { initTheme } from "./ui/themeSwitcher";

/**
 * Initializes application on page load:
 * - applies saved theme
 * - loads and renders favorite books
 * - restores search state from URL
 */

export const initApp = () => {
  initTheme();
  loadFavoritesFromStorage();
  renderFavorites();
  initSearchFromUrl();
};
