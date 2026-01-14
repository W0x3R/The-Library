import { loadThemeFromStorage, setThemeToStorage } from "../storage/themeStorage";

// DOM elements
const rootEl = document.documentElement;
export const themeSwitcherBtnEl = document.querySelector(".header__theme-switcher");

// Theme is controlled via data-theme attribute on <html>
// CSS styles are applied based on this attribute

/**
 * Initializes theme on page load:
 * - loads saved theme from storage
 * - falls back to "light" theme
 * - applies theme to document root
 */
export const initTheme = () => {
  const savedTheme = loadThemeFromStorage();
  setTheme(savedTheme);
};

export const toggleTheme = () => {
  const newTheme = rootEl.dataset.theme === "dark" ? "light" : "dark";
  setTheme(newTheme);
};

const setTheme = (theme) => {
  rootEl.dataset.theme = theme;
  setThemeToStorage(theme);
};
