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
    console.log(Math.floor(getWordCount(text) / minutesPassed));
    wpm.textContent = Math.floor(getWordCount(text) / minutesPassed) + " WPM";
 }

function getInitialTime() {
    return new Date().getTime();
}

function setBackground() {
    let index = Math.floor(Math.random() * bgImages.length);
    document.body.style.backgroundImage = `url(${bgImages[index]})`;
    document.body.style.backgroundSize = 'cover'
    // Need to make sure index isn't same as current bg
}

// DOM elements
let input = document.createElement("textarea");
input.setAttribute("type", "text");
input.setAttribute("placeholder", "Enter text here");
input.autofocus = true;
const container = document.querySelector(".container");
container.appendChild(input);

let metrics = document.querySelector(".metrics");
let charCount = document.createElement("span");
let wordCount = document.createElement("span");
let sentenceCount = document.createElement("span");
let wpm = document.createElement("span");
charCount.textContent = "0 CHARACTER(S)";
wordCount.textContent = "0 WORD(S)";
sentenceCount.textContent = "0 SENTENCE(S)";
wpm.textContent = "0 WPM";
const metricsArr = [charCount, wordCount, sentenceCount, wpm];
metricsArr.forEach(function(element) {
    element.setAttribute("class", "metric");
    metrics.appendChild(element);
});

container.appendChild(metrics);

let text = '';


// Background images
let bgImages = ['bgt.jpg'];

// Get input from textarea
input.addEventListener('input', display);

// Button to change background
const bgButton = document.getElementById("btn");
bgButton.addEventListener("click", setBackground);
let initTime = getInitialTime();
setInterval(getTypingSpeed, 500);