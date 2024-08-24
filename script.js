const symbols = ['😀', '😁', '😎', '🎉', '🌟', '🍀', '🎩', '🍎', '🚀', '💡', '🎶', '🎈'];
let cards = [];
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let timer;
let timeElapsed = 0;
let difficulty = 'medium';
let isGameStarted = false;


const gameBoard = document.getElementById('gameBoard');
const movesCounter = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const restartButton = document.getElementById('restart');
const difficultySelect = document.getElementById('difficulty');

function initializeGame() {
    isGameStarted = false;
    moves = 0;
    timeElapsed = 0;
    movesCounter.textContent = moves;
    timerDisplay.textContent = formatTime(timeElapsed);
    const difficultyLevel = difficultySelect.value;
    const numPairs = getNumPairs(difficultyLevel);
    cards = shuffle([...symbols.slice(0, numPairs), ...symbols.slice(0, numPairs)]).map((symbol, index) => {
        return {id: index, symbol, flipped: false, matched: false};
        // return {id: index, symbol, flipped: false, matched: false, htmlDivEL: ''};
    });
    renderBoard();
    flippedCards = [];
    matchedCards = [];
    clearInterval(timer);
    // startTimer();
}

// 3*3

// switch (difficulty) {
//         case 'easy':
//             return 4; // 4 pairs, 8 cards total
//         case 'medium':
//             return 6; // 6 pairs, 12 cards total
//         case 'hard':
//             return 8; // 8 pairs, 16 cards total
//         default:
//             return 4;
//     }
function getNumPairs(difficulty) {
    switch (difficulty) {
        case 'easy':
            // return 4; // 4 pairs, 8 cards total
            return 3; // 4 pairs, 8 cards total
        case 'medium':
            // return 6; // 6 pairs, 12 cards total
            return 8; // 6 pairs, 12 cards total
        case 'hard':
            return 10; // 8 pairs, 16 cards total
        default:
            return 4;
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function calcBoardColumns(cardsNum) {
    if (cardsNum == 6) {
        return 3
    } else if (cardsNum == 16) {
        return 4
    } else if (cardsNum == 20) {
        return 5

    }
}

function renderBoard() {
    gameBoard.innerHTML = '';
    // gameBoard.style.gridTemplateColumns = `repeat(${Math.sqrt(cards.length)}, 1fr)`; move...  in another places!!!
    gameBoard.style.gridTemplateColumns = `repeat(${calcBoardColumns(cards.length)}, 1fr)`;
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        // if (card.flipped) {
        //     cardElement.classList.add('flip');
        // }
        cardElement.innerHTML = `
            <div class="front"></div>
            <div class="back">${card.symbol}</div>
        `;

        card.htmlDivEL = cardElement

        // cardElement.addEventListener('click', () => handleCardClick(card.id));
        cardElement.addEventListener('click', () => handleCardClick(card.id, cardElement));
        // cardElement.addEventListener('click', flipCard);

        gameBoard.appendChild(cardElement);
    });
}

// function flipCard() {
//     console.log(this)
//     this.classList.add('flip');
// }

function handleCardClick(id, cardEl) {
    if (!isGameStarted) {
        startTimer();
        isGameStarted = true;
    }

    if (flippedCards.length === 2) return;
    const card = cards.find(c => c.id === id);
    if (card.flipped || card.matched) return;

    // card.classList.add('flipped');
    card.flipped = true;
    card.htmlDivEL.classList.add('flip');
    // cardEl.classList.add('flip');
    // htmlDivEL

    // console.log(card)
    // console.log(cardEl)

    flippedCards.push(card);
    // renderBoard();

    if (flippedCards.length === 2) {
        moves++;
        movesCounter.textContent = moves;
        checkForMatch(cardEl);
    }
}

function checkForMatch(cardEl) {
    const [card1, card2] = flippedCards;
    if (card1.symbol === card2.symbol) {
        card1.matched = true;
        card2.matched = true;
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            clearInterval(timer);
            isGameStarted = false;

            // setTimeout(() => alert(`You won in ${moves} moves and ${formatTime(timeElapsed)}!`), 500);

            setTimeout(() => {
                // win.innerHTML = `
                // <span class="win-text">
                //     You won!<br />
                //     with <span class="highlight">${moves}</span> moves<br />
                //     under <span class="highlight">${formatTime(timeElapsed)}</span> seconds
                // </span>`


                const winDiv = document.createElement('div');
                winDiv.id = 'win';
                winDiv.innerHTML = `
                <span class="win-text">
                    You won<br />
                    in <span class="highlight">${moves}</span> moves<br />
                    and <span class="highlight">${formatTime(timeElapsed)}</span> !
                </span>
            `
    gameBoard.appendChild(winDiv)


            });

        }
    } else {
        setTimeout(() => {
            card1.flipped = false;
            card2.flipped = false;

            card1.htmlDivEL.classList.remove('flip')
            card2.htmlDivEL.classList.remove('flip')
            // card2.flipped = false;
            // cardEl.classList.remove('flip')

            flippedCards = [];
            // renderBoard();
        }, 1000);
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeElapsed++;
        timerDisplay.textContent = formatTime(timeElapsed);
    }, 1000);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

restartButton.addEventListener('click', initializeGame);
difficultySelect.addEventListener('change', initializeGame);

initializeGame();
