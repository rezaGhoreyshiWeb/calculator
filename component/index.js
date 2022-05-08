import { switcherTheme } from "./switcherTheme.js";
import { onloadThemeChecker } from "./onloadThemeChecker.js";
// elements
const switcherEl = document.getElementById("switcher");
const actionsEl = document.querySelectorAll(".actions");

// events
switcherEl.addEventListener("click", switcherTheme);
window.addEventListener("load", onloadThemeChecker);
actionsEl.forEach(el => el.addEventListener("click", (e) => console.log(e.target.dataset.value)))
