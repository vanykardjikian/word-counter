function display(e) {
    // Get text from textarea
    text = getText(e);

    // Display metrics
    charCount.textContent = getCharCount(text) + " CHARACTER(S)";
    wordCount.textContent = getWordCount(text) + " WORD(S)";
    sentenceCount.textContent = getSentenceCount(text) + " SENTENCE(S)";
}


function getText(e) {
    return e.target.value;
}


function getWordCount(text) {
    // A word is any set of characters seperated by one or two spaces
   return text.split(/\S+/).length - 1;
}


function getCharCount(text) {
    return text.length;
}


function getSentenceCount(text) {
    /** A sentence is a set of words seperated by a dot, question mark 
    or exclamation point followed by a space or is the end of a string */
    const re = /[.?!]$|[.?!]\s/
    console.log(text.split(re));
    return text.split(re).length - 1;
}


function getTypingSpeed() {
    if (text.length == 0) {
        initTime = getInitialTime();
        wpm.textContent = "0 WPM";
        return;
    }
    let currentTime = new Date().getTime();
    let minutesPassed = ((currentTime - initTime) / 1000) / 60;
    wpm.textContent = Math.floor(getWordCount(text) / minutesPassed) + " WPM";
}

function getInitialTime() {
    return new Date().getTime();
}

function setBackground() {
    let currentBackground = document.body.style.backgroundImage;
    document.body.style.backgroundImage = background;
    background = currentBackground;
    toggleTheme.classList.toggle("dark");
    metrics.classList.toggle("dark")
}

// DOM elements
let input = document.createElement("textarea");
input.setAttribute("type", "text");
input.setAttribute("placeholder", "Enter text here");
input.autofocus = true;
const container = document.querySelector(".container");
container.appendChild(input);

// Metrics
let metrics = document.querySelector(".metrics");
let charCount = document.createElement("span");
let wordCount = document.createElement("span");
let sentenceCount = document.createElement("span");
let wpm = document.createElement("span");
let clearButton = document.querySelector("#clear");
charCount.textContent = "0 CHARACTER(S)";
wordCount.textContent = "0 WORD(S)";
sentenceCount.textContent = "0 SENTENCE(S)";
wpm.textContent = "0 WPM";
const elements = [charCount, wordCount, sentenceCount, wpm];
elements.forEach(function(element) {
    element.setAttribute("class", "metric");
    metrics.appendChild(element);
});

// Set initial background
document.body.style.backgroundImage = "url('https://www.toptal.com/designers/subtlepatterns/uploads/subtle_dots.png')";
let background = "url('darkness.png')";


// Textarea event listener
let text = '';
input.addEventListener('input', display);

// Clear button
clearButton.addEventListener("click", function() {
    input.value = '';
    input.dispatchEvent(new Event('input'));
});

// Button to change background
const toggleTheme = document.getElementById("toggle-theme");
toggleTheme.addEventListener("click", setBackground);

// Update typing speed every 500 ms
let initTime = getInitialTime();
setInterval(getTypingSpeed, 500);