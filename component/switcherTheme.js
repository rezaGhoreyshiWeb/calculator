export function switcherTheme() {
  document.documentElement.classList.toggle("dark");
  if (localStorage.getItem("theme")) {
    localStorage.removeItem("theme");
    return;
  }

  localStorage.setItem("theme", "dark");
}

