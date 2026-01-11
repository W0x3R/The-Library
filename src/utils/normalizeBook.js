export const normalizeBook = (book) => {
  return {
    title: book.title || "No title",
    author: book.author_name || "Unknown author",
    year: book.first_publish_year || "-",
    coverId: book.cover_i || null,
  };
};
