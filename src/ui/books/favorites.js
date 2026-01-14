import { loadFavoritesFromStorage, saveFavoritesToStorage } from "../../storage/favoritesStorage";
import { syncBookFavoriteState } from "./books";
import { favoriteBookTemplate } from "./booksTemplates";

// DOM elements
export const favoritesContainer = document.querySelector(".favorites__books-wrapper");
const favoritesErrorEl = document.querySelector(".favorites__error");
const favoritesCount = document.querySelector(".favorites__heading-subtitle");

const favorites = loadFavoritesFromStorage();

export const isFavorite = (id) => favorites.has(id);

export const toggleFavorites = (book) => {
  favorites.has(book.id) ? favorites.delete(book.id) : favorites.set(book.id, book);
  saveFavoritesToStorage(favorites);
};

// Update counter and error visibility
const updateFavoritesUI = () => {
  const isEmpty = favorites.size === 0;

  favoritesErrorEl.classList.toggle("visible", isEmpty);
  favoritesCount.textContent = `${favorites.size} Books saved`;
};

export const renderFavorites = () => {
  favoritesContainer.innerHTML = "";
  updateFavoritesUI();

  const fragment = document.createDocumentFragment();

  favorites.forEach((book) => {
    fragment.appendChild(favoriteBookTemplate(book));
  });

  favoritesContainer.appendChild(fragment);
};

// Remove a book from favorites and sync state with main book list
export const handleRemoveBookOnClick = (e) => {
  const btn = e.target.closest(".favorites__books-btn");
  if (!btn) return;

  const bookEl = btn.closest("article");
  const bookId = bookEl.dataset.id;
  favorites.delete(bookId);

  saveFavoritesToStorage(favorites);
  syncBookFavoriteState(bookId);
  renderFavorites();
};
