import "./styles/normalize.css";
import "./styles/style.css";

import { booksContainer, syncBookFavoriteState } from "./ui/books/books";
import {
  handleSearch,
  initSearchFromUrl,
  searchBtnEl,
  searchInputEl,
} from "./ui/search";
import { initTheme, themeSwitcherBtnEl, toggleTheme } from "./ui/themeSwitcher";
import { debounce } from "./utils/debounce";
import { renderFavorites, toggleFavorites } from "./ui/books/favorites";

themeSwitcherBtnEl.addEventListener("click", toggleTheme);
searchBtnEl.addEventListener("click", handleSearch);
searchInputEl.addEventListener("input", debounce(handleSearch, 500));
searchInputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSearch();
  }
});

booksContainer.addEventListener("click", (e) => {
  const favoriteBtn = e.target.closest(".book__favorite-btn");
  if (!favoriteBtn) return;
  const bookEl = favoriteBtn.closest(".book");
  const bookId = bookEl.dataset.id;

  toggleFavorites(bookId);
  syncBookFavoriteState(bookId);
  renderFavorites();
});

initTheme();
initSearchFromUrl();
renderFavorites();
