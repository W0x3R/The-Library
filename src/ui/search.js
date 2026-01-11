import { getBooksByQuery } from "../api/openLibrary";
import { getQueryUrl, setQueryUrl } from "../utils/url";
import { renderBooks } from "./books";
import { removeLoader, showLoader } from "./loader";

const searchInputEl = document.querySelector(".library__form-input");
const searchBtnEl = document.querySelector(".library__search-btn");

const searchBooks = async (query) => {
  if (!query) return;
  showLoader();

  try {
    const books = await getBooksByQuery(query);
    renderBooks(books);
  } catch (error) {
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
