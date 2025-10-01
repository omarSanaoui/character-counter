//toggle dark-light mode
const theme_switcher = document.querySelector(".switch-themes");
const logo = document.querySelector(".logo");
const body = document.querySelector("body");

let mode = localStorage.getItem("theme") || "dark-mode";
body.classList.remove("dark-mode", "light-mode");
body.classList.add(mode);
updateIcons(mode);

theme_switcher.addEventListener("click",() => {
    mode = mode === "dark-mode" ? "light-mode" : "dark-mode";
    body.classList.remove("dark-mode", "light-mode");
    body.classList.add(mode);
    localStorage.setItem("theme",mode);
    localStorage.getItem("theme")

    updateIcons(mode);
})

function updateIcons(mode){
    if(mode == "dark-mode"){
        logo.src = "icons/logo-dark-theme.svg";
        theme_switcher.src = "icons/icon-sun.svg";
    }else{
        logo.src = "icons/logo-light-theme.svg";
        theme_switcher.src = "icons/icon-moon.svg";
    }
}
//counting

