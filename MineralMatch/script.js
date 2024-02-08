const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

shuffleDeck();

function flipCard(e) {
    if (disableDeck === true) {
        console.log("deck disabled");
        return; // safely exit to avoid multiple clicks
    }
    let clickedCard = e.target; // getting user clicked card

    safelyAddFlipClass(clickedCard);

// if cardOne is empty then set the object and exit
    if(!cardOne) {
        return cardOne = clickedCard
    }
// otherwise, compare the two cards
    else {
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImgFileName = cardOne.querySelector("img").src;
        let cardTwoImgFileName = cardTwo.querySelector("img").src;
        matchCards(cardOneImgFileName,cardTwoImgFileName);
    }



/*
    if(clickedCard !== cardOne) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            // return the cardOne value to clickedCard
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImgFileName = cardOne.querySelector("img").src;
        let cardTwoImgFileName = cardTwo.querySelector("img").src;
        matchCards(cardOneImgFileName,cardTwoImgFileName);
    }*/
}

function safelyAddFlipClass(card){
    disableDeck = true;
    card.classList.add("flip");
    disableDeck = false;
}

function matchCards (img1, img2) {
    // if two cards match
    if(img1 === img2) {
        disableDeck = true;
        matchedCard++;
        console.log(matchedCard);
        if (matchedCard == 8) {
            setTimeout(() => {
                return shuffleDeck();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ""; // setting both card values to blank
        disableDeck = false;
    }
    //if not matched
    else {
        disableDeck = true;
        shakeTheCardsToSayNo();
        rehideChosenCards();
        disableDeck = false;
    };
}

function shakeTheCardsToSayNo() {
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);
}

function rehideChosenCards(){
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        resetChoices();
    }, 1200);
}

function resetChoices(){
    cardOne = cardTwo = "";
}

function shuffleDeck() {
    matchedCard = 0;
    resetChoices();
    disableDeck = false;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

//removing flip class from all the cards and passing a random image to all cards
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/img-${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    });
}

cards.forEach(card => { // adding click event to all cards
    card.addEventListener("click", flipCard);
});