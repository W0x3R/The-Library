// DOM elements
const loaderEl = document.querySelector(".loader");

// Show or hide loader while fetching books from Open Library API
export const showLoader = () => {
  loaderEl.classList.add("visible");
};

export const removeLoader = () => {
  loaderEl.classList.remove("visible");
};
