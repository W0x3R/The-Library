const THEME_KEY = "theme";
const root = document.documentElement;
export const themeSwitcherBtnEl = document.querySelector(
  ".header__theme-switcher"
);

export const initTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  setTheme(savedTheme);
};

export const toggleTheme = () => {
  const newTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(newTheme);
};

const setTheme = (theme) => {
  root.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
};
