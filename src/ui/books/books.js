import { NO_AUTHOR_RESULTS_ERROR } from "../../constants/error";
import { normalizeBook } from "../../utils/normalizeBook";
import { removeError, setErrorData, showError } from "../error";
import { bookTemplate } from "./booksTemplates";
import { isFavorite, renderFavorites, toggleFavorites } from "./favorites";

export const booksContainer = document.querySelector(".books-wrapper");
export const authorFilterContainer = document.querySelector(".library__author-wrapper");
export const authorFilterInputEl = authorFilterContainer.querySelector(".library__author-input");

let rawBooks = [];
let lastRenderedBooks = [];
let authorFilter = "";

export const getBooks = () => lastRenderedBooks;

export const showBooks = () => {
  booksContainer.classList.add("visible");
};

export const hideBooks = () => {
  booksContainer.classList.remove("visible");
};

const setBooks = (books) => {
  rawBooks = books;
  lastRenderedBooks = books.map(normalizeBook);
};

export const showAuthorInput = () => {
  authorFilterContainer.classList.add("visible");
};

export const removeAuthorInput = () => {
  authorFilterContainer.classList.remove("visible");
};

const filterByAuthor = (books, author) => {
  if (!author) {
    return books;
  }

  const value = author.toLowerCase();
  return books.filter((book) =>
    book.author_name?.some((name) => name.toLowerCase().includes(value))
  );
};

export const resetAuthorFilter = () => {
  authorFilter = "";
  authorFilterInputEl.value = "";
};

const getFilteredBooks = () => {
  const filteredBooksByAuthor = filterByAuthor(rawBooks, authorFilter);
  if (!filteredBooksByAuthor || filteredBooksByAuthor.length === 0) {
    hideBooks();
    setErrorData(NO_AUTHOR_RESULTS_ERROR);
    showError();
    return filterByAuthor(rawBooks, authorFilter);
  }
  removeError();
  showBooks();
  return filterByAuthor(rawBooks, authorFilter);
};

const renderBooks = (books) => {
  booksContainer.innerHTML = "";

  const fragment = document.createDocumentFragment();

  books.map(normalizeBook).forEach((book) => {
    const bookElement = bookTemplate(book, isFavorite);
    fragment.appendChild(bookElement);
  });

  booksContainer.appendChild(fragment);
};

export const renderBooksFromSearch = (books) => {
  setBooks(books);
  renderBooks(getFilteredBooks());
};

export const syncBookFavoriteState = (id) => {
  const bookEl = booksContainer.querySelector(`article[data-id="${id}"]`);
  const btn = bookEl.querySelector(".book__favorite-btn");
  btn.classList.toggle("favorite", isFavorite(id));
};

export const handleBooksActionsOnClick = (e) => {
  const favoriteBtn = e.target.closest(".book__favorite-btn");
  if (!favoriteBtn) return;
  const bookEl = favoriteBtn.closest(".book");
  const bookId = bookEl.dataset.id;

  const book = getBooks().find((b) => b.id === bookId);
  if (!book) return;

  toggleFavorites(book);
  syncBookFavoriteState(bookId);
  renderFavorites();
};

export const handleAuthorFilter = (e) => {
  authorFilter = e.target.value;
  renderBooks(getFilteredBooks());
};
