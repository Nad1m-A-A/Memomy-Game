const cardArray = [
    {
        title: 'cheeseburger',
        path: 'images/cheeseburger.png'
    },
    {
        title: 'fries',
        path: 'images/fries.png'
    },
    {
        title: 'hotdog',
        path: 'images/hotdog.png'
    },
    {
        title: 'ice-cream',
        path: 'images/ice-cream.png'
    },
    {
        title: 'milkshake',
        path: 'images/milkshake.png'
    },
    {
        title: 'pizza',
        path: 'images/pizza.png'
    },
    {
        title: 'cheeseburger',
        path: 'images/cheeseburger.png'
    },
    {
        title: 'fries',
        path: 'images/fries.png'
    },
    {
        title: 'hotdog',
        path: 'images/hotdog.png'
    },
    {
        title: 'ice-cream',
        path: 'images/ice-cream.png'
    },
    {
        title: 'milkshake',
        path: 'images/milkshake.png'
    },
    {
        title: 'pizza',
        path: 'images/pizza.png'
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
        grid.append(img);

        setTimeout(() => {
        img.setAttribute('src', 'images/blank.png');
        grid.append(img);
        img.addEventListener('click', function(e){
            const clicked = e.target;
            if(clicked.getAttribute('src').includes('white')) return
            flipCard(clicked);
        })
        }, 2000)
    });
};

function flipCard(clicked){
    const cardId = clicked.getAttribute('data-id');
    if(chosenCardsIds[0] === cardId) return;
    clicked.setAttribute('src', sortedCardArray[cardId].path);

    chosenCards.push(sortedCardArray[cardId].title);
    chosenCardsIds.push(cardId);

    if(chosenCards.length === 2)
    setTimeout(checkMatch, 100);
};

function checkMatch(){
    const cards = grid.querySelectorAll('img');

    if(chosenCards[0] === chosenCards[1]){
        cards[chosenCardsIds[0]].setAttribute('src', 'images/white.png');
        cards[chosenCardsIds[1]].setAttribute('src', 'images/white.png');
        score++;
    } else {
        cards[chosenCardsIds[0]].setAttribute('src', 'images/blank.png');
        cards[chosenCardsIds[1]].setAttribute('src', 'images/blank.png');
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