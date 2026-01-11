import { getBooksByQuery } from "../api/openLibrary";
import { getQueryUrl, setQueryUrl } from "../utils/url";
import { hideBooks, renderBooks, showBooks } from "./books";
import { removeError, setErrorData, showError } from "./error";
import { removeLoader, showLoader } from "./loader";
import { NETWORK_ERROR, NO_RESULTS_ERROR } from "../constants/error";

const searchInputEl = document.querySelector(".library__form-input");
const searchBtnEl = document.querySelector(".library__search-btn");

const searchBooks = async (query) => {
  if (!query) return;
  showLoader();
  removeError();
  hideBooks();

  try {
    const books = await getBooksByQuery(query);

    if (books.length === 0) {
      hideBooks();
      setErrorData(NO_RESULTS_ERROR);
      showError();
      return;
    }

    showBooks();
    renderBooks(books);
  } catch (error) {
    setErrorData(NETWORK_ERROR);
    showError();
  } finally {
    removeLoader();
  }
};

const initialQuery = getQueryUrl();

if (initialQuery) {
  searchInputEl.value = initialQuery;
  searchBooks(initialQuery);
}

searchBtnEl.addEventListener("click", async () => {
  const query = searchInputEl.value.trim();
  setQueryUrl(query);
  searchBooks(query);
});
