const THEME_KEY = "theme";

export const loadThemeFromStorage = () => localStorage.getItem(THEME_KEY);

export const setThemeToStorage = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
};
