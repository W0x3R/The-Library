const errorEl = document.querySelector(".error");
const errorHeadingEl = errorEl.querySelector(".error__heading");
const errorSubheadingEl = errorEl.querySelector(".error__subheading");
const errorImg = errorEl.querySelector(".error__img");

export const setErrorData = ({ heading, subheading, imgSrc, alt }) => {
  errorHeadingEl.textContent = heading;
  errorSubheadingEl.textContent = subheading;
  errorImg.setAttribute("src", imgSrc);
  errorImg.setAttribute("alt", alt);
};

export const showError = () => {
  errorEl.classList.add("visible");
};

export const removeError = () => {
  errorEl.classList.remove("visible");
};
