export const debounce = (fn, ms) => {
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn();
    }, ms);
  };
};
