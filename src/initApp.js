import { loadFavoritesFromStorage } from "./storage/favoritesStorage";
import { renderFavorites } from "./ui/books/favorites";
import { initSearchFromUrl } from "./ui/search";
import { initTheme } from "./ui/themeSwitcher";

export const initApp = () => {
  initTheme();
  loadFavoritesFromStorage();
  renderFavorites();
  initSearchFromUrl();
};
