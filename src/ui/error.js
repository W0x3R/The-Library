const booksErrorEl = document.querySelector(".books__error");
const booksErrorHeadingEl = booksErrorEl.querySelector(".books__error-heading");
const booksErrorSubheadingEl = booksErrorEl.querySelector(
  ".books__error-subheading"
);
const booksErrorImg = booksErrorEl.querySelector(".books__error-img");

export const setErrorData = ({ heading, subheading, imgSrc, alt }) => {
  booksErrorHeadingEl.textContent = heading;
  booksErrorSubheadingEl.textContent = subheading;
  booksErrorImg.setAttribute("src", imgSrc);
  booksErrorImg.setAttribute("alt", alt);
};

export const showError = () => {
  booksErrorEl.classList.add("visible");
};

export const removeError = () => {
  booksErrorEl.classList.remove("visible");
};
