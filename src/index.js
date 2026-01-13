import "./styles/normalize.css";
import "./styles/style.css";
import "./api/openLibrary";
import "./ui/search";
import { initTheme, toggleTheme } from "./ui/themeSwitcher";

const themeSwitcherBtnEl = document.querySelector(".header__theme-switcher");

themeSwitcherBtnEl.addEventListener("click", toggleTheme);
initTheme();
