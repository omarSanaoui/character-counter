//toggle dark-light mode
const theme_switcher = document.querySelector("switch-themes");
const logo = document.querySelector(".logo")
const body = document.querySelector("body");

let mode = "dark-mode";

theme_switcher.addEventListener("click",() => {
    body.classList.toggle("dark-mode");
})