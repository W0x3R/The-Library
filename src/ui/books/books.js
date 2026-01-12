import { normalizeBook } from "../../utils/normalizeBook";
import { bookTemplate, favoriteBookTemplate } from "./booksTemplates";

const booksContainer = document.querySelector(".books-wrapper");
const favoritesContainer = document.querySelector(".favorites__books-wrapper");
const favoritesErrorEl = document.querySelector(".favorites__error");
const favoritesCount = document.querySelector(".favorites__heading-subtitle");

let rawBooks = [];
let lastRenderedBooks = [];
const favorites = new Set();

export const showBooks = () => {
  booksContainer.classList.add("visible");
};

export const hideBooks = () => {
  booksContainer.classList.remove("visible");
};

const isFavorite = (id) => favorites.has(id);

const getBookDataById = (id) =>
  lastRenderedBooks.find((book) => book.id === id);

const setBooks = (books) => {
  rawBooks = books;
  lastRenderedBooks = books.map(normalizeBook);
};

export const renderBooks = (books) => {
  setBooks(books);
  showBooks();

  booksContainer.innerHTML = "";

  const fragment = document.createDocumentFragment();

  lastRenderedBooks.forEach((book) => {
    const bookElement = bookTemplate(book, isFavorite);
    fragment.appendChild(bookElement);
  });

  booksContainer.appendChild(fragment);
};

const toggleFavorites = (id) =>
  favorites.has(id) ? favorites.delete(id) : favorites.add(id);

booksContainer.addEventListener("click", (e) => {
  const favoriteBtn = e.target.closest(".book__favorite-btn");
  if (!favoriteBtn) return;
  const bookEl = favoriteBtn.closest(".book");
  const bookId = bookEl.dataset.id;

  toggleFavorites(bookId);
  favoriteBtn.classList.toggle("favorite");
  renderFavorites();
});

const updaterFavoritesUI = () => {
  const isEmpty = favorites.size === 0;

  favoritesErrorEl.classList.toggle("visible", isEmpty);
  favoritesCount.textContent = `${favorites.size} Books saved`;
};

export const renderFavorites = () => {
  favoritesContainer.innerHTML = "";
  updaterFavoritesUI();
  const fragment = document.createDocumentFragment();
  favorites.forEach((id) => {
    const book = getBookDataById(id);
    if (!book) return;
    fragment.appendChild(favoriteBookTemplate(book));
  });
  favoritesContainer.appendChild(fragment);
};

favoritesContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".favorites__books-btn");
  if (!btn) return;

  const bookEl = btn.closest("article");
  const bookId = bookEl.dataset.id;

  toggleFavorites(bookId);
  btn.classList.toggle("favorite");
  renderFavorites();
});

renderFavorites();
