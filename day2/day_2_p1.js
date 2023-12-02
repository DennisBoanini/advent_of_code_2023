const fs = require('fs');

const input = fs.readFileSync('./day2/input.txt', 'utf8');
const MAX_BLUE_CUBES = 14, MAX_RED_CUBES = 12, MAX_GREEN_CUBES = 13;

const inputArray = input.split('\n').map((item) => item.replace(/Game \d+: /gm, ""));
let IDS_OF_POSSIBLE_GAMES = [];

inputArray.forEach((item, index) => {
    let configurationOk = true;
    const configuration = item.split(";");
    configuration.forEach((cubes) => {
        const blueCubes = cubes.split(', ').filter((cube) => cube.includes('blue')).map((cube) => cube.replace(' blue', ''))
            .map(cube => parseInt(cube));
        const redCubes = cubes.split(', ').filter((cube) => cube.includes('red')).map((cube) => cube.replace(' blue', ''))
            .map(cube => parseInt(cube));
        const greenCubes = cubes.split(', ').filter((cube) => cube.includes('green')).map((cube) => cube.replace(' blue', ''))
            .map(cube => parseInt(cube));

        if (blueCubes > MAX_BLUE_CUBES || redCubes > MAX_RED_CUBES || greenCubes > MAX_GREEN_CUBES) {
            configurationOk = false;
        }
    })
    if (configurationOk) {
        IDS_OF_POSSIBLE_GAMES.push(index + 1);
    }
});

console.log(IDS_OF_POSSIBLE_GAMES.reduce((a, b) => a + b, 0));



