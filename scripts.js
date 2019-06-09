let allCards = document.querySelectorAll('.card');



function flipCard() {
    this.classList.add('flip');
}


allCards.forEach(card => card.addEventListener('click', flipCard));