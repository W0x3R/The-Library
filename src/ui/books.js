const booksContainer = document.querySelector(".books-wrapper");

export const showBooks = () => {
  booksContainer.classList.add("visible");
};

export const hideBooks = () => {
  booksContainer.classList.remove("visible");
};

const bookTemplate = ({
  title,
  cover_i,
  author_name: author,
  first_publish_year: year,
}) => {
  const article = document.createElement("article");
  article.className = "book";
  const bannerSrc = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}.jpg`
    : "https://placehold.co/160x240?&font=oswald&text=No%20cover";
  article.innerHTML = `

    <figure class="book__figure">
      <img class="book__banner" src=${bannerSrc} width="170" height="240" loading='lazy'>
      <figcaption class="book__description-wrapper">
        <h3 class="book__title">${title}</h3>
        <p class="book__author">${author}</p>
        <p class="book__year">${year}</p>
      </figcaption>
      <button class="book__favorite-btn" title="Add to favorite">
        <svg class="book__favorite-img" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.667 9.333c.993-.973 2-2.14 2-3.666A3.667 3.667 0 0011 2c-1.173 0-2 .333-3 1.333C7 2.333 6.173 2 5 2a3.667 3.667 0 00-3.667 3.667c0 1.533 1 2.7 2 3.666L8 14l4.667-4.667z" stroke="#7C736A" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </figure>
    `;

  return article;
};

export const renderBooks = (books) => {
  showBooks();
  booksContainer.innerHTML = "";

  const fragment = document.createDocumentFragment();

  books.forEach((book) => {
    console.log(book);
    const bookElement = bookTemplate(book);
    fragment.appendChild(bookElement);
  });
  booksContainer.appendChild(fragment);
};
