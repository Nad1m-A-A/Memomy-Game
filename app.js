const cardArray = [
    {
        title: 'cheeseburger',
        path: 'photos/pineapple.jpg'
    },
    {
        title: 'fries',
        path: 'photos/watermelon.jpg'
    },
    {
        title: 'hotdog',
        path: 'photos/papaya.jpg'
    },
    {
        title: 'ice-cream',
        path: 'photos/orange.jpg'
    },
    {
        title: 'milkshake',
        path: 'photos/kiwi.jpg'
    },
    {
        title: 'pizza',
        path: 'photos/avocado.jpg'
    },
    {
        title: 'cheeseburger',
        path: 'photos/pineapple.jpg'
    },
    {
        title: 'fries',
        path: 'photos/watermelon.jpg'
    },
    {
        title: 'hotdog',
        path: 'photos/papaya.jpg'
    },
    {
        title: 'ice-cream',
        path: 'photos/orange.jpg'
    },
    {
        title: 'milkshake',
        path: 'photos/kiwi.jpg'
    },
    {
        title: 'pizza',
        path: 'photos/avocado.jpg'
    }
];
// const sortedCardArray = cardArray.sort(() => 0.5 - Math.random()); 
// this way you will mutate the original array

const grid = document.querySelector('#grid');
const scoreDOM = document.querySelector('#score');
const roundDOM = document.querySelector('#round');

let chosenCards = [];
let chosenCardsIds = [];
let score = 0;
let round = 1;

const organizer = function(){
    // return sortedCardArray = Array.from(cardArray);
    return sortedCardArray = Array.from(cardArray).sort(() => 0.5 - Math.random());
};

function startGame(){
    organizer();
    grid.innerHTML = '';
    createImages();
}
startGame();

function createImages(){
    sortedCardArray.forEach((card, i) => {
        const img = document.createElement('img');
    
        img.setAttribute('data-id', i)
        img.setAttribute('src', card.path);    
        img.setAttribute('class', 'wooden_hand');    
        grid.append(img);

        setTimeout(() => {
        img.setAttribute('src', 'photos/wooden_hand.jpg');
        // img.setAttribute('src', 'images/blank.png');
        grid.append(img);
        img.addEventListener('click', function(e){
            const clicked = e.target;
            if(clicked.getAttribute('src').includes('white')) return
            flipCard(clicked);
        })
        }, 5000)
    });
};

function flipCard(clicked){
    const cardId = clicked.getAttribute('data-id');
    if(chosenCardsIds[0] === cardId) return;
    clicked.setAttribute('src', sortedCardArray[cardId].path);

    chosenCards.push(sortedCardArray[cardId].title);
    chosenCardsIds.push(cardId);

    if(chosenCards.length === 2)
    setTimeout(checkMatch, 300);
};

function checkMatch(){
    const cards = grid.querySelectorAll('img');

    if(chosenCards[0] === chosenCards[1]){
        cards[chosenCardsIds[0]].setAttribute('src', 'photos/white.png');
        cards[chosenCardsIds[1]].setAttribute('src', 'photos/white.png');
        score++;
    } else {
        cards[chosenCardsIds[0]].setAttribute('src', 'photos/wooden_hand.jpg');
        cards[chosenCardsIds[1]].setAttribute('src', 'photos/wooden_hand.jpg');
        score--;
    }

    chosenCards = [];
    chosenCardsIds = [];
    scoreDOM.innerHTML = score;

    restartGame(cards);
};

function restartGame(cards){
    const cardsToArray = [...cards];
    const allFound = cardsToArray.every(card => card.src.includes('white'));
    if (allFound){
        round++;
        roundDOM.innerHTML = round;
        startGame();
    }
};