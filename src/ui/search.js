import { getBooksByQuery } from "../api/openLibrary";
import { getQueryUrl, setQueryUrl } from "../utils/url";
import {
  hideBooks,
  removeAuthorInput,
  renderBooksFromSearch,
  resetAuthorFilter,
  showAuthorInput,
} from "./books/books";
import { removeError, setErrorData, showError } from "./error";
import { removeLoader, showLoader } from "./loader";
import { NETWORK_ERROR, NO_RESULTS_ERROR } from "../constants/error";

// DOM elements
export const searchInputEl = document.querySelector(".library__form-input");
export const searchBtnEl = document.querySelector(".library__search-btn");
const searchErrorEl = document.querySelector(".library__form-error");

// AbortController to cancel previous search requests when a new search starts
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

/**
 * Performs book search by query:
 * Cancels previous request, shows loader, handles empty results & network errors
 * @param {string} query
 */
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
      removeAuthorInput();
      setErrorData(NO_RESULTS_ERROR);
      showError();
      return;
    }

    resetAuthorFilter();
    renderBooksFromSearch(books);
    showAuthorInput();
  } catch (error) {
    if (error.name === "AbortError") return;
    removeAuthorInput();
    setErrorData(NETWORK_ERROR);
    showError();
  } finally {
    removeLoader();
    toggleSearchBtn(false);
  }
};

export const handleSearch = () => {
  const query = searchInputEl.value.trim();

  if (!query) {
    removeAuthorInput();
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

// Initialize search state from URL query on page load
export const initSearchFromUrl = () => {
  const initialQuery = getQueryUrl();

  if (initialQuery) {
    searchInputEl.value = initialQuery;
    searchBooks(initialQuery);
  }
};

export const handleKeydownSearch = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSearch();
  }
};
