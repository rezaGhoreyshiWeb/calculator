export function onloadThemeChecker(){
    if (localStorage.getItem("theme")) {
        document.documentElement.classList.add("dark");
    }
}