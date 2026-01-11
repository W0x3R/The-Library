const loaderEl = document.querySelector(".loader");

export const showLoader = () => {
  loaderEl.classList.add("visible");
};

export const removeLoader = () => {
  loaderEl.classList.remove("visible");
};
