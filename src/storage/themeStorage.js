const THEME_KEY = "theme";

/**
 * Load the saved theme from localStorage.
 * Returns "light" if no theme is stored.
 */
export const loadThemeFromStorage = () => localStorage.getItem(THEME_KEY) || "light";

/**
 * Save the selected theme to localStorage.
 * @param {string} theme - "light" or "dark"
 */
export const setThemeToStorage = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
};
