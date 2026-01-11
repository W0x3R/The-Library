export const getQueryUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("q");
};

export const setQueryUrl = (value) => {
  const url = new URL(window.location.href);
  if (value) {
    url.searchParams.set("q", value);
  } else {
    url.searchParams.delete("q");
  }
  window.history.pushState({}, "", url);
};
