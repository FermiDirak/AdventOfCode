import {readFileSync} from 'fs';

const inputs = readFileSync('./day1-1.txt', 'utf8').split('\n');

const masses = inputs.map(input => Number.parseInt(input));

function massToFuel(mass: number) {
  return Math.max(Math.floor(mass / 3) - 2, 0);
}
const requiredFuel = masses
  .map(mass => massToFuel(mass))
  .reduce((a, b) => a + b, 0);

console.log(requiredFuel);
