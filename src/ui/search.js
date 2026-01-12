import { getBooksByQuery } from "../api/openLibrary";
import { getQueryUrl, setQueryUrl } from "../utils/url";
import { hideBooks, renderBooks, showBooks } from "./books/books";
import { removeError, setErrorData, showError } from "./error";
import { removeLoader, showLoader } from "./loader";
import { NETWORK_ERROR, NO_RESULTS_ERROR } from "../constants/error";
import { debounce } from "../utils/debounce";

const searchInputEl = document.querySelector(".library__form-input");
const searchBtnEl = document.querySelector(".library__search-btn");
const searchErrorEl = document.querySelector(".library__form-error");
let controller;

const toggleSearchBtn = (disabled) => {
  searchBtnEl.disabled = disabled;
};

const showInputError = () => {
  searchInputEl.classList.add("invalid");
  searchErrorEl.classList.add("visible");
};

const removeInputError = () => {
  searchInputEl.classList.remove("invalid");
  searchErrorEl.classList.remove("visible");
};

const searchBooks = async (query) => {
  if (controller) controller.abort();
  controller = new AbortController();

  showLoader();
  removeError();
  hideBooks();
  toggleSearchBtn(true);

  try {
    const books = await getBooksByQuery(query, controller.signal);

    if (!books || books.length === 0) {
      setErrorData(NO_RESULTS_ERROR);
      showError();
      return;
    }

    showBooks();
    renderBooks(books);
  } catch (error) {
    if (error.name === "AbortError") return;
    setErrorData(NETWORK_ERROR);
    showError();
  } finally {
    removeLoader();
    toggleSearchBtn(false);
  }
};

const handleSearch = () => {
  const query = searchInputEl.value.trim();

  if (!query) {
    removeError();
    hideBooks();
    showInputError();
    setQueryUrl("");
    return;
  }

  removeInputError();

  if (query !== getQueryUrl()) {
    setQueryUrl(query);
    searchBooks(query);
  }
};

searchBtnEl.addEventListener("click", handleSearch);
searchInputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSearch();
  }
});
searchInputEl.addEventListener("input", debounce(handleSearch, 500));

const initialQuery = getQueryUrl();

if (initialQuery) {
  searchInputEl.value = initialQuery;
  searchBooks(initialQuery);
}
