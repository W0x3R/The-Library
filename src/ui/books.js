import { normalizeBook } from "../utils/normalizeBook";

const booksContainer = document.querySelector(".books-wrapper");
const favoritesContainer = document.querySelector(".favorites__books-wrapper");
const favoritesErrorEl = document.querySelector(".favorites__error");
const favoritesCount = document.querySelector(".favorites__heading-subtitle");
let rawBooks = [];
let lastRenderedBooks = [];
const favorites = [];

export const showBooks = () => {
  booksContainer.classList.add("visible");
};

export const hideBooks = () => {
  booksContainer.classList.remove("visible");
};

const bookTemplate = ({ id, title, author, year, coverId }) => {
  const article = document.createElement("article");
  article.className = "book";
  article.dataset.id = id;
  const isBookFavorite = isFavorite(id);

  const bannerSrc = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}.jpg`
    : "https://placehold.co/160x240?&font=oswald&text=No%20cover";
  article.innerHTML = `
    <figure class="book__figure">
      <img class="book__banner" src=${bannerSrc} width="170" height="240" loading='lazy'>
      <figcaption class="book__description-wrapper">
        <h3 class="book__title">${title}</h3>
        <p class="book__author">${author}</p>
        <p class="book__year">${year}</p>
      </figcaption>
      <button class="book__favorite-btn ${isBookFavorite ? "favorite" : ""}">
        <svg class="book__favorite-img" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.667 9.333c.993-.973 2-2.14 2-3.666A3.667 3.667 0 0011 2c-1.173 0-2 .333-3 1.333C7 2.333 6.173 2 5 2a3.667 3.667 0 00-3.667 3.667c0 1.533 1 2.7 2 3.666L8 14l4.667-4.667z" stroke="#7C736A" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </figure>
    `;

  return article;
};

export const renderBooks = (books) => {
  rawBooks = books;
  lastRenderedBooks = books.map(normalizeBook);

  showBooks();
  if (favorites.length > 0) {
    favoritesErrorEl.classList.remove("visible");
  }

  booksContainer.innerHTML = "";

  const fragment = document.createDocumentFragment();

  lastRenderedBooks.forEach((book) => {
    const bookElement = bookTemplate(book);
    fragment.appendChild(bookElement);
  });
  booksContainer.appendChild(fragment);
};

const toggleFavorites = (book) => {
  const index = favorites.findIndex((favorite) => favorite.id === book.id);

  if (index === -1) {
    favorites.push(book);
  } else {
    favorites.splice(index, 1);
  }
};

const isFavorite = (id) => favorites.some((favorite) => favorite.id === id);

const getBookDataById = (id) =>
  lastRenderedBooks.find((book) => book.id === id);

booksContainer.addEventListener("click", (e) => {
  const favoriteBtn = e.target.closest(".book__favorite-btn");
  if (!favoriteBtn) return;
  const bookEl = favoriteBtn.closest(".book");
  const bookId = bookEl.dataset.id;
  const book = getBookDataById(bookId);

  toggleFavorites(book);
  renderBooks(rawBooks);
  renderFavorites();
});

const favoriteBookTemplate = ({ id, title, author, year, coverId }) => {
  const article = document.createElement("article");
  article.dataset.id = id;
  const bannerSrc = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}.jpg`
    : "https://placehold.co/70x110?&font=oswald&text=No%20cover";

  article.innerHTML = `
      <figure class="favorites__books-item">
        <img src="${bannerSrc}" alt="${title}" class="favorites__books-banner" />
        <div class="favorites__books-description">
          <h4 class="favorites__books-title">${title}</h4>
          <p class="favorites__books-author">${author}</p>
          <p class="favorites__books-year">${year}</p>
        </div>
        <button class="favorites__books-btn title="Remove from favorite">
          <svg width="16" height="16" fill="red" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.667 9.333c.993-.973 2-2.14 2-3.666A3.667 3.667 0 0011 2c-1.173 0-2 .333-3 1.333C7 2.333 6.173 2 5 2a3.667 3.667 0 00-3.667 3.667c0 1.533 1 2.7 2 3.666L8 14l4.667-4.667z" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </figure>
  `;
  return article;
};

export const renderFavorites = () => {
  if (!favorites || favorites.length === 0) {
    favoritesErrorEl.classList.add("visible");
  }
  favoritesContainer.innerHTML = "";
  favoritesCount.textContent = `${favorites.length} Books saved`;
  const fragment = document.createDocumentFragment();
  favorites.forEach((favoriteBook) => {
    const favoriteBookEl = favoriteBookTemplate(favoriteBook);
    fragment.appendChild(favoriteBookEl);
  });
  favoritesContainer.appendChild(fragment);
};

favoritesContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".favorites__books-btn");
  if (!btn) return;

  const bookEl = btn.closest("article");
  const bookId = bookEl.dataset.id;
  const book = getBookDataById(bookId);

  toggleFavorites(book);
  renderBooks(rawBooks);
  renderFavorites();
});

renderFavorites();

if (!favorites || favorites.length === 0) {
  favoritesErrorEl.classList.add("visible");
} else {
  favoritesErrorEl.classList.remove("visible");
  renderFavorites();
}
