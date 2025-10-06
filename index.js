//toggle dark-light mode
const themeSwitcher = document.querySelector(".switch-themes");
const logo = document.querySelector(".logo");
const body = document.body;
const angleDown = document.createElement("img");

let mode = localStorage.getItem("theme") || "dark-mode";
body.classList.remove("dark-mode", "light-mode");
body.classList.add(mode);
updateIcons(mode);

themeSwitcher.addEventListener("click", () => {
    mode = mode === "dark-mode" ? "light-mode" : "dark-mode";
    body.classList.remove("dark-mode", "light-mode");
    body.classList.add(mode);
    localStorage.setItem("theme", mode);
    localStorage.getItem("theme")

    updateIcons(mode);
})

function updateIcons(mode) {
    if (mode == "dark-mode") {
        logo.src = "icons/logo-dark-theme.svg";
        themeSwitcher.src = "icons/icon-sun.svg";
        angleDown.src = "icons/angle-small-down-dark.svg"
    } else {
        logo.src = "icons/logo-light-theme.svg";
        themeSwitcher.src = "icons/icon-moon.svg";
        angleDown.src = "icons/angle-small-down-light.svg"
    }
}
//update character counter number:
function updateCharCounter() {
    const inputValue = inputText.value.trim().toUpperCase();
    //counters
    charactersCounter.textContent = characterCounter(inputValue);
    wordsCounter.textContent = wordCounter(inputValue);
    sentencesCounter.textContent = sentenceCounter(inputValue);

    //reading time
    readingTime(wordCounter(inputValue));

    //toggle comment when input is empty
    densityDivComment.style.display = inputText.value !== "" ? "none" : "block";
    displayBtn.style.display = inputText.value !== "" ? "flex" : "none";

    //letter density
    letterDensity(inputValue);
}

//counting
const inputText = document.querySelector(".text-input");
const charactersCounter = document.querySelector(".characters-counter");
const wordsCounter = document.querySelector(".words-counter");
const sentencesCounter = document.querySelector(".sentences-counter");

inputText.addEventListener("input", updateCharCounter);

//characters counter:
function characterCounter(input) {
    if (excludeSpaces()) {
        return input.split(" ").join("").length;
    } else {
        return input.length;
    }
}
//words counter:
function wordCounter(input) {
    return input.split(" ").filter((w) => w.trim()).length;
}
//sentences counter:
function sentenceCounter(input) {
    return input.split(/[\.\?!]+/).filter((s) => s.trim()).length;
}
//exclude spaces
const excludeSpacesCheck = document.querySelector("#exclude-spaces");
excludeSpacesCheck.addEventListener("click", updateCharCounter);

function excludeSpaces() {
    if (excludeSpacesCheck.checked) {
        return true;
    } else {
        return false;
    }
}
//set limit:
const setLimitCheck = document.querySelector("#set-limit");
const setLimitInput = document.querySelector(".limit");
//Show set limit input:
setLimitCheck.addEventListener("click", () => {
    setLimitInput.classList.toggle("active");
    if (!setLimitCheck.checked) {
        inputText.removeAttribute("maxlength");
    }
});
//set max lenght of a input
setLimitInput.addEventListener("input", () => {
    const limitValue = parseInt(setLimitInput.value);
    if (limitValue > 0) {
        inputText.setAttribute("maxlength", limitValue);
    } else {
        inputText.removeAttribute("maxlength")
    }


})

//calculating the approximit reading time:
function readingTime(wordscount) {
    const timeSpan = document.querySelector(".reading-time span");
    if (!wordscount || wordscount === 0) {
        timeSpan.textContent = ""; 
        return;
    }
    const timeValue = wordscount / 200;
    timeSpan.textContent = timeValue.toFixed(2) + " minute";
}

//density:
const letterContainer = document.querySelector(".letter-container");
const densityDivComment = document.querySelector(".comment");

function letterDensity(input) {
    //reset the container
    letterContainer.innerHTML = "";
    //getting only characters(unique)
    const chars = input.replace(/[^A-Z]/g, "").split("");
    const uniqueChars = chars.reduce((acc, c) => {
        if (!acc.includes(c)) {
            acc.push(c);
        }
        return acc;
    }, []);
    //sorting
    uniqueChars.sort((a, b) => {
        const countA = chars.filter(c => c == a).length;
        const countB = chars.filter(c => c == b).length;
        return countB - countA
    });
    if (uniqueChars.length <= 7) {
        displayBtn.style.display = "none";
    }
    //looping and creating the elements
    uniqueChars.forEach((char) => {
        const letterItem = document.createElement("div");
        letterItem.classList.add("letter-item");

        const character = document.createElement("span");
        character.classList.add("character");

        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");

        const progressBarFill = document.createElement("div");
        progressBarFill.classList.add("progress-bar-fill");

        const count = document.createElement("span");
        count.classList.add("item-counter");

        const percent = document.createElement("span");
        percent.classList.add("percent");

        const countChar = chars.filter(c => c === char).length;
        const percentChar = (countChar / chars.length) * 100;


        character.textContent = char.toUpperCase();
        percent.textContent = `(${percentChar.toFixed(1)}%)`;
        count.textContent = countChar;
        progressBarFill.style.width = `${percentChar}%`;

        progressBar.appendChild(progressBarFill);
        letterItem.append(character, progressBar, count, percent);
        letterContainer.appendChild(letterItem);
    })
}
const letterAnylase = document.querySelector(".letter-density");
const displayBtn = document.createElement("button");
displayBtn.textContent = "See more";
displayBtn.classList.add("display-btn");

angleDown.classList.add("angle");
displayBtn.append(angleDown);
letterAnylase.appendChild(displayBtn);

//visibility
displayBtn.addEventListener("click", () => {
    displayBtn.classList.toggle("active");
    const isActive = displayBtn.classList.contains("active");

    const letterItems = document.querySelectorAll(".letter-item");
    const letterContainer = document.querySelector(".letter-container");

    letterContainer.classList.toggle("expanded", isActive);

    letterItems.forEach((item, index) => {
        //show the first 7
        if (index >= 7) {
            item.style.display = isActive ? "flex" : "none";
        }
    });

    //toggling text and arrow
    displayBtn.firstChild.textContent = isActive ? "See less" : "See more";
});


