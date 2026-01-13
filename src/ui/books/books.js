import { normalizeBook } from "../../utils/normalizeBook";
import { bookTemplate } from "./booksTemplates";
import { isFavorite } from "./favorites";

export const booksContainer = document.querySelector(".books-wrapper");

let rawBooks = [];
let lastRenderedBooks = [];

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

export const syncBookFavoriteState = (id) => {
  const bookEl = booksContainer.querySelector(`article[data-id="${id}"]`);
  const btn = bookEl.querySelector(".book__favorite-btn");
  btn.classList.toggle("favorite", isFavorite(id));
};
