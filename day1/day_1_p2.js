const fs = require('fs');

const input = fs.readFileSync('./day1/input.txt', 'utf8');

const inputArray = input.split('\n');
const wordNumberMap = new Map([
    ['one', 'o1e'],
    ['two', 't2o'],
    ['three', 3],
    ['four', 4],
    ['five', 5],
    ['six', 6],
    ['seven', 7],
    ['eight', 'e8t'],
    ['nine', 9],
]);

const replaceWordWithNumber = (item) => {
    wordNumberMap.forEach((value, key) => {
        item = item.replaceAll(key, value);
    });
    return item;
}

const onlyDigits = inputArray
    .map((item) => replaceWordWithNumber(item))
    .map((item) => item.match(/-?\d+/g).join(''));

const solution = onlyDigits.reduce((acc, curr) => acc + +`${curr[0] + curr[curr.toString().length - 1]}`, 0);
console.log(solution);