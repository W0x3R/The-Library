import { loadThemeFromStorage, setThemeToStorage } from "../storage/themeStorage";

const root = document.documentElement;
export const themeSwitcherBtnEl = document.querySelector(".header__theme-switcher");

export const initTheme = () => {
  const savedTheme = loadThemeFromStorage() || "light";
  setTheme(savedTheme);
};

export const toggleTheme = () => {
  const newTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(newTheme);
};

const setTheme = (theme) => {
  root.dataset.theme = theme;
  setThemeToStorage(theme);
};
