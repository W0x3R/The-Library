import "./styles/normalize.css";
import "./styles/style.css";

import { booksContainer, handleBooksActionsOnClick } from "./ui/books/books";
import { handleKeydownSearch, handleSearch, searchBtnEl, searchInputEl } from "./ui/search";
import { themeSwitcherBtnEl, toggleTheme } from "./ui/themeSwitcher";
import { debounce } from "./utils/debounce";
import { favoritesContainer, handleRemoveBookOnClick } from "./ui/books/favorites";
import { initApp } from "./initApp";

themeSwitcherBtnEl.addEventListener("click", toggleTheme);
searchBtnEl.addEventListener("click", handleSearch);
searchInputEl.addEventListener("input", debounce(handleSearch, 500));
searchInputEl.addEventListener("keydown", (e) => handleKeydownSearch(e));
booksContainer.addEventListener("click", (e) => handleBooksActionsOnClick(e));
favoritesContainer.addEventListener("click", (e) => handleRemoveBookOnClick(e));

initApp();
