const fs = require('fs');

const input = fs.readFileSync('./day3/input.txt', 'utf8');
const engineSchema = input.split('\n')
let numbersToSum = []

const isDigit = char => /[0-9]+/.test(char)
const isSpecialSymbol = char => char !== '.' && !isDigit(char)

function checkIfIsValidNumber(digitPosition, lineIdx) {
    if (!digitPosition.length) {
        return false
    }

    const leftMost = digitPosition[0]
    const rightMost = digitPosition[digitPosition.length - 1]
    const line = engineSchema[lineIdx]
    if (leftMost !== 0 && isSpecialSymbol(line[leftMost - 1])) {
        return true
    }

    if (rightMost !== line.length - 1 && isSpecialSymbol(line[rightMost + 1])) {
        return true
    }

    if (lineIdx !== 0) {
        let upperLine = engineSchema[lineIdx - 1];
        if (leftMost !== 0 && isSpecialSymbol(upperLine[leftMost - 1])) {
            return true
        }

        if (rightMost !== upperLine.length - 1 && isSpecialSymbol(upperLine[rightMost + 1])) {
            return true
        }

        for (let i = 0; i < digitPosition.length ; i++) {
            if (isSpecialSymbol(upperLine[digitPosition[i]])) {
                return true
            }
        }
    }

    if (lineIdx !== engineSchema.length - 1) {
        let lowerLine = engineSchema[lineIdx + 1];
        if (leftMost !== 0 && isSpecialSymbol(lowerLine[leftMost - 1])) {
            return true
        }

        if (rightMost !== lowerLine.length - 1 && isSpecialSymbol(lowerLine[rightMost + 1])) {
            return true
        }

        for (let i = 0; i < digitPosition.length ; i++) {
            if (isSpecialSymbol(lowerLine[digitPosition[i]])) {
                return true
            }
        }
    }

    return false;
}

engineSchema.forEach((line, lineIdx) => {
    let digitPosition = []
    line.replace('\r', '').split('').forEach((element, elementIdx) => {
        if (isDigit(element)) {
            digitPosition.push(elementIdx)
            if ((elementIdx === line.length - 1 && digitPosition.length > 0) || !isDigit(line[elementIdx + 1])) {
                const isValid = checkIfIsValidNumber(digitPosition, lineIdx)
                if (isValid) {
                    let numberString = ''
                    for (let i = 0; i < digitPosition.length; i++) {
                        numberString += line[digitPosition[i]]
                    }

                    numbersToSum.push(Number(numberString))
                }

                digitPosition = []
            }
        }
    })
})

console.log(numbersToSum.reduce((a, b) => a + b, 0))

// result should be 550064