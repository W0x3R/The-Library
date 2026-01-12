const getBannerSrc = (coverId) => {
  return coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}.jpg`
    : `https://placehold.co/170x140?&font=oswald&text=No%20cover`;
};

const favoriteIcon = (isActive = false) => {
  return ` 
  <svg class="favorite__icon" width="16" height="16" fill="${
    isActive ? "var(--red)" : "none"
  }" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.667 9.333c.993-.973 2-2.14 2-3.666A3.667 3.667 0 0011 2c-1.173 0-2 .333-3 1.333C7 2.333 6.173 2 5 2a3.667 3.667 0 00-3.667 3.667c0 1.533 1 2.7 2 3.666L8 14l4.667-4.667z" stroke="#7C736A" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
};

export const bookTemplate = (
  { id, title, author, year, coverId },
  isFavorite
) => {
  const article = document.createElement("article");
  article.className = "book";
  article.dataset.id = id;
  const isBookFavorite = isFavorite(id);

  article.innerHTML = `
    <figure class="book__figure">
      <img class="book__banner" src=${getBannerSrc(
        coverId
      )} width="170" height="240" loading='lazy' alt="${title}">
      <figcaption class="book__description-wrapper">
        <h3 class="book__title">${title}</h3>
        <p class="book__author">${author}</p>
        <p class="book__year">${year}</p>
      </figcaption>
      <button class="book__favorite-btn ${
        isBookFavorite ? "favorite" : ""
      }" title="${isBookFavorite ? "Remove from favorite" : "Add to favorite"}">
        ${favoriteIcon()}
      </button>
    </figure>
    `;

  return article;
};

export const favoriteBookTemplate = ({ id, title, author, year, coverId }) => {
  const article = document.createElement("article");
  article.dataset.id = id;

  article.innerHTML = `
      <figure class="favorites__books-item">
        <img class="favorites__books-banner" src="${getBannerSrc(
          coverId
        )}" width="70" height="110" alt="${title}"  />
        <div class="favorites__books-description">
          <h4 class="favorites__books-title">${title}</h4>
          <p class="favorites__books-author">${author}</p>
          <p class="favorites__books-year">${year}</p>
        </div>
        <button class="favorites__books-btn" title="Remove from favorite">
          ${favoriteIcon(true)}
        </button>
      </figure>
  `;
  return article;
};
