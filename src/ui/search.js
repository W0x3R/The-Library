import { getBooksByQuery } from "../api/openLibrary";
import { getQueryUrl, setQueryUrl } from "../utils/url";
import { renderBooks } from "./books";
import { setErrorData, showError } from "./error";
import { removeLoader, showLoader } from "./loader";

const searchInputEl = document.querySelector(".library__form-input");
const searchBtnEl = document.querySelector(".library__search-btn");

const searchBooks = async (query) => {
  if (!query) return;
  showLoader();

  try {
    const books = await getBooksByQuery(query);
    if (books.length === 0) {
      setErrorData({
        heading: "No results found.",
        subheading: `We can't find books matching your search. Please try a different query.`,
        imgSrc: "/assets/images/not-found.webp",
        alt: "Books not found",
      });
      showError();
      return;
    }
    renderBooks(books);
  } catch (error) {
    console.log(error);
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
