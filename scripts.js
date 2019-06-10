// timer
let timer = setInterval(clock, 1000);
let sec = 0;
let min = 0;

"use strict";

let allCards = document.querySelectorAll(".card");
let resetBtn = document.getElementById("reset");
let isFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  //  not a match lock board
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  // first card clicked sets to true, this targets to clicked card
  if (!isFlipped) {
    isFlipped = true;
    firstCard = this;
    // stop function
    return;
  }
  // second card clicked sets to false, this targets to clicked card
  secondCard = this;
  lockBoard = true;

  checkMatchedCards();
}

function checkMatchedCards() {
  //  if names matches
  let isMatch = firstCard.dataset.match === secondCard.dataset.match;
  // if isMatch true "stopCards()" else false do "throwBack()"
  isMatch ? stopCards() : throwBack();
}

function stopCards() {
  //  unable to click on matched cards
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function throwBack() {
  // unmatched cards loses flip class
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  isFlipped = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

// loop through all cards, on click execute flipCard function
allCards.forEach(card => card.addEventListener("click", flipCard));
resetBtn.addEventListener('click', ()=> {
    location.reload();
});

function clock(){
    
    sec += 1;
    if (sec == 60) {
        min += 1;
        sec = 00;
        if (sec == 60) {
            sec = 00;
            min += 1;
        }
    }
    document.getElementById("timer").innerHTML ="Timer: " + min +' min ' + sec + ' sec';

    if(min == 60) {
        alert('You hit the limit');
        sec = 0;
        min = 0;
        location.reload();
    }
}

// IFFE invokes immediately, shuffling cards to random positions in html
(function shuffle() {
  allCards.forEach(card => {
    // Number between 0 to 15;
    let randomPosition = Math.ceil(Math.random() * 16);
    card.style.order = randomPosition;
  });
})();
