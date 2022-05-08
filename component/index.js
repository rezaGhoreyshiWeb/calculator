import { switcherTheme } from "./switcherTheme.js";
import { onloadThemeChecker } from "./onloadThemeChecker.js";
// elements
const switcher = document.getElementById("switcher");

// events
switcher.addEventListener("click", switcherTheme);
window.addEventListener("load", onloadThemeChecker);
