const booksLoaderEl = document.querySelector(".books__loader");

export const showLoader = () => {
  booksLoaderEl.classList.add("visible");
};

export const removeLoader = () => {
  booksLoaderEl.classList.remove("visible");
};
