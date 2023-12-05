const fs = require('fs');

const inputFile = fs.readFileSync('./day4/input.txt', 'utf8');
let inputArray = inputFile.split('\n')

const map = new Map(inputArray.map((input, index) => [index + 1, [input.replace(/Card \d+:/, '').trim()]]))
const scratchcards = new Map([...Array(inputArray.length)].map((_, i) => [i + 1, 1]))

function checkTotalWins(value) {
    let winCount = 0
    const [winnerCard, myNumbers] = value.split('|');
    const winnerSortedCard = winnerCard.trim().split(/\s+/).map(a => Number(a)).sort();
    const mySortedNumbers = myNumbers.trim().split(/\s+/).map(a => Number(a)).sort();

    mySortedNumbers.forEach(number => {
        if(winnerSortedCard.includes(number)) {
            winCount++
        }
    })

    return winCount;
}

for (const [key, value] of map) {
    const totalWins = checkTotalWins(value[0]);

    for (let i = key + 1; i < (totalWins + key + 1); i++) {
        scratchcards.set(i, scratchcards.get(i) + (scratchcards.get(key)))
    }
}

console.log(Array.from(scratchcards.entries()).reduce((a, [_, v]) => a + v, 0))