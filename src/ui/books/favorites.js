import { getBooks, syncBookFavoriteState } from "./books";
import { favoriteBookTemplate } from "./booksTemplates";

const favoritesContainer = document.querySelector(".favorites__books-wrapper");
const favoritesErrorEl = document.querySelector(".favorites__error");
const favoritesCount = document.querySelector(".favorites__heading-subtitle");

const favorites = new Set();

const getBookById = (id) => getBooks().find((book) => book.id === id);

export const isFavorite = (id) => favorites.has(id);

export const toggleFavorites = (id) =>
  favorites.has(id) ? favorites.delete(id) : favorites.add(id);

export const renderFavorites = () => {
  favoritesContainer.innerHTML = "";
  updaterFavoritesUI();
  const fragment = document.createDocumentFragment();

  favorites.forEach((id) => {
    const book = getBookById(id);
    if (!book) return;

    fragment.appendChild(favoriteBookTemplate(book));
  });

  favoritesContainer.appendChild(fragment);
};

const updaterFavoritesUI = () => {
  const isEmpty = favorites.size === 0;

  favoritesErrorEl.classList.toggle("visible", isEmpty);
  favoritesCount.textContent = `${favorites.size} Books saved`;
};

favoritesContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".favorites__books-btn");
  if (!btn) return;

  const bookEl = btn.closest("article");
  const bookId = bookEl.dataset.id;

  toggleFavorites(bookId);
  syncBookFavoriteState(bookId);
  renderFavorites();
});
