
const greetingContainer = document.querySelector("#quote-container"),
  greetingText = document.querySelector("#greeting"),
  copyBtn = document.querySelector("#copy"),
  newGreetingBtn = document.querySelector("#new-greeting"),
    loader = document.querySelector('#loader');

let apiGreetings = [];
//show loader
function loading() {
  loader.hidden = false;
  greetingContainer.hidden = true;
}
//hide loader
function complete() {
  greetingContainer.hidden = false;
  loader.hidden = true;
}
// show new greet
const greet = function newGreeting() {
  loading()
  //Pick random quote from api arr
  const greeting =
    apiGreetings[Math.floor(Math.random() * apiGreetings.length)];
  //Set greeting, Hide Loader
  greetingText.textContent = greeting.greeting
  complete()
}

// function newGreeting() {
//   //Pick random quote from api arr
//   const greeting =
//     localGreetings[Math.floor(Math.random() * localGreetings.length)];
//   console.log(JSON.stringify(localGreetings));
// }

// Get greetings from API
async function getGreetings() {
  loading()
  const apiURL = "https://test-softuni-1-default-rtdb.firebaseio.com/.json";
  try {
    const response = await fetch(apiURL);
    apiGreetings = await response.json();
    greet();
  copyBtn.textContent = 'копирай';
  } catch (err) {
    throw new Error();
  }
}

const copy = async () => {
  try {
    await navigator.clipboard.writeText(greetingText.innerHTML);
    copyBtn.textContent = ':)';
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}
//Event Listeners
copyBtn.addEventListener('click', copy)
newGreetingBtn.addEventListener("click", getGreetings)
// On load
getGreetings();
