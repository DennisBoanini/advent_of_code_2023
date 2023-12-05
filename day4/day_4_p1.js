const fs = require('fs');

const inputFile = fs.readFileSync('./day4/input.txt', 'utf8');
const inputArray = inputFile.split('\n')
let gameScore = []
inputArray.forEach(card => {
    let score = 0
    const cleanCard = card.replace(/Card \d+:/, '');
    const [winnerCard, myNumbers] = cleanCard.split('|');
    const winnerSortedCard = winnerCard.trim().split(/\s+/).map(a => Number(a)).sort();
    const mySortedNumbers = myNumbers.trim().split(/\s+/).map(a => Number(a)).sort();

    mySortedNumbers.forEach(number => {
        if(winnerSortedCard.includes(number)) {
            score = score === 0 ? 1 : score * 2
        }
    })

    gameScore.push(score)
})

console.log(gameScore.reduce((a, b) => a + b, 0))