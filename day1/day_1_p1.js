const fs = require('fs');

const input = fs.readFileSync('./day1/input.txt', 'utf8');

const inputArray = input.split('\n');

const onlyDigits = inputArray.map((item) => item.match(/-?\d+/g).join(''));

const solution = onlyDigits.reduce((acc, curr) => acc + +`${curr[0] + curr[curr.toString().length - 1]}`, 0);

console.log(solution)
