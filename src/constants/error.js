import notFoundImg from "/assets/icons/not-found.svg";
import errorImg from "/assets/icons/error.svg";
import notFoundAuthorImg from "/assets/icons/not-found-author.svg";

// Error messages and associated images used in the app
export const NO_RESULTS_ERROR = {
  heading: "No results found.",
  subheading: `We can't find books matching your search. Please try a different query.`,
  imgSrc: notFoundImg,
  alt: "Books not found",
};

export const NETWORK_ERROR = {
  heading: "Something went wrong.",
  subheading: `Please try again.`,
  imgSrc: errorImg,
  alt: "Network error",
};

export const NO_AUTHOR_RESULTS_ERROR = {
  heading: "No books found for this author.",
  subheading: `Please try another name.`,
  imgSrc: notFoundAuthorImg,
  alt: "No books found for this author",
};
