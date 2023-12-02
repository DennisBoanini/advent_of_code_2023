const fs = require('fs');

const input = fs.readFileSync('./day2/input.txt', 'utf8');
const MAX_BLUE_CUBES = 14, MAX_RED_CUBES = 12, MAX_GREEN_CUBES = 13;

const inputArray = input.split('\n').map((item) => item.replace(/Game \d+: /gm, ""));
let IDS_OF_POSSIBLE_GAMES = [];

inputArray.forEach((item, index) => {
    let fewestNumberOfCubes = {
        red: 0,
        green: 0,
        blue: 0
    }
    const configuration = item.split(";");
    configuration.forEach((cubes) => {
        const blueCubes = cubes
            .split(', ')
            .filter((cube) => cube.includes('blue'))
            .map((cube) => cube.replace(' blue', ''))
            .map(cube => parseInt(cube));
        fewestNumberOfCubes.blue = blueCubes.length ? Math.max(...blueCubes, fewestNumberOfCubes.blue) : fewestNumberOfCubes.blue;
        const redCubes = cubes.split(', ').filter((cube) => cube.includes('red')).map((cube) => cube.replace(' blue', ''))
            .map(cube => parseInt(cube));
        fewestNumberOfCubes.red = redCubes.length ? Math.max(...redCubes, fewestNumberOfCubes.red) : fewestNumberOfCubes.red;
        const greenCubes = cubes.split(', ').filter((cube) => cube.includes('green')).map((cube) => cube.replace(' blue', ''))
            .map(cube => parseInt(cube));
        fewestNumberOfCubes.green = greenCubes.length ? Math.max(...greenCubes, fewestNumberOfCubes.green) : fewestNumberOfCubes.green;
    })

    IDS_OF_POSSIBLE_GAMES.push(fewestNumberOfCubes);

});

console.log(IDS_OF_POSSIBLE_GAMES.reduce((acc, item) => acc += item.blue * item.red * item.green ,0));