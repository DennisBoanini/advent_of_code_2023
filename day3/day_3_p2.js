const fs = require('fs');

const input = fs.readFileSync('./day3/input.txt', 'utf8');
const engineSchema = input.split('\n')
let numbersToSum = []
let zeroArray = []

const isDigit = char => /[0-9]+/.test(char)
const isAsterisk = char => char === '*'

function foundPartNumbers(elementIdx, lineIdx) {
    let multipliers = []
    if (isDigit(engineSchema[lineIdx][elementIdx - 1])) {
        let leftNumber = ''
        for (let i = elementIdx - 1; i >= 0 && isDigit(engineSchema[lineIdx][i]); i--) {
            leftNumber += engineSchema[lineIdx][i]
        }

        if (leftNumber.split('').reverse().join('')) {
            multipliers.push(Number(leftNumber.split('').reverse().join('')))
        }
    }

    if (isDigit(engineSchema[lineIdx][elementIdx + 1])) {
        let rightNumber = ''
        for (let i = elementIdx + 1; i < engineSchema[lineIdx].length && isDigit(engineSchema[lineIdx][i]); i++) {
            rightNumber += engineSchema[lineIdx][i]
        }

        if (rightNumber) {
            multipliers.push(Number(rightNumber))
        }
    }

    if (lineIdx !== 0) {
        let isCenterNumber = isDigit(engineSchema[lineIdx - 1][elementIdx]) && isDigit(engineSchema[lineIdx - 1][elementIdx + 1]) && isDigit(engineSchema[lineIdx - 1][elementIdx - 1])
        if (isDigit(engineSchema[lineIdx - 1][elementIdx]) && !isDigit(engineSchema[lineIdx - 1][elementIdx + 1]) && !isDigit(engineSchema[lineIdx - 1][elementIdx - 1])) {
            multipliers.push(Number(engineSchema[lineIdx - 1][elementIdx]))
        }

        if (isDigit(engineSchema[lineIdx - 1][elementIdx - 1])) {
            let topLeftNumber = ''
            let tempIndex = elementIdx - 1
            while (isDigit(engineSchema[lineIdx - 1][tempIndex - 1])) {
                tempIndex--
            }

            for (let i = tempIndex; isDigit(engineSchema[lineIdx - 1][i]); i++) {
                topLeftNumber += engineSchema[lineIdx - 1][i]
            }

            if (topLeftNumber) {
                multipliers.push(Number(topLeftNumber))
            }
        }

        if (!isCenterNumber && isDigit(engineSchema[lineIdx - 1][elementIdx + 1])) {
            let topRightNumber = ''
            let tempIndex = elementIdx + 1;
            while (isDigit(engineSchema[lineIdx - 1][tempIndex - 1])) {
                tempIndex--
            }

            for (let i = tempIndex; isDigit(engineSchema[lineIdx - 1][i]); i++) {
                topRightNumber += engineSchema[lineIdx - 1][i]
            }

            if (topRightNumber) {
                multipliers.push(Number(topRightNumber))
            }
        }
    }

    if (lineIdx !== engineSchema.length - 1) {
        let isCenterNumber = isDigit(engineSchema[lineIdx + 1][elementIdx]) && isDigit(engineSchema[lineIdx + 1][elementIdx + 1]) && isDigit(engineSchema[lineIdx + 1][elementIdx - 1])
        if (isDigit(engineSchema[lineIdx + 1][elementIdx]) && !isDigit(engineSchema[lineIdx + 1][elementIdx + 1]) && !isDigit(engineSchema[lineIdx + 1][elementIdx - 1])) {
            multipliers.push(Number(engineSchema[lineIdx + 1][elementIdx]))
        }

        if (isDigit(engineSchema[lineIdx + 1][elementIdx - 1])) {
            let bottomLeftNumber = ''
            let tempIndex = elementIdx - 1;
            while (isDigit(engineSchema[lineIdx + 1][tempIndex - 1])) {
                tempIndex--
            }

            for (let i = tempIndex; isDigit(engineSchema[lineIdx + 1][i]); i++) {
                bottomLeftNumber += engineSchema[lineIdx + 1][i]
            }

            if (bottomLeftNumber) {
                multipliers.push(Number(bottomLeftNumber))
            }
        }

        if (!isCenterNumber && isDigit(engineSchema[lineIdx + 1][elementIdx + 1])) {
            let bottomRightNumber = ''
            let tempIndex = elementIdx + 1;
            while (isDigit(engineSchema[lineIdx + 1][tempIndex - 1])) {
                tempIndex--
            }

            for (let i = tempIndex; isDigit(engineSchema[lineIdx + 1][i]); i++) {
                bottomRightNumber += engineSchema[lineIdx + 1][i]
            }

            if (bottomRightNumber) {
                multipliers.push(Number(bottomRightNumber))
            }
        }
    }

    return multipliers.length === 2 ? multipliers : [0,0]
}

engineSchema.forEach((line, lineIdx) => {
    let digitPosition = []
    line.replace('\r', '').split('').forEach((element, elementIdx) => {
        if (isAsterisk(element)) {
            numbersToSum.push(foundPartNumbers(elementIdx, lineIdx))
        }
    })
})

console.log(JSON.stringify(numbersToSum))
console.log(numbersToSum.reduce((a, b) => a += b[0] * b[1], 0))

// Result should be 85010461