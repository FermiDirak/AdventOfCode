import {readFileSync} from 'fs';

const inputs = readFileSync('./day1-2.txt', 'utf8').split('\n');

const masses = inputs.map(input => Number.parseInt(input));

function massToFuel(mass: number) {
  return Math.max(Math.floor(mass / 3) - 2, 0);
}

function calculateFuel(moduleMass: number) {
  let total = 0;
  let dMass = moduleMass;

  while (dMass > 0) {
    const nextDMass = massToFuel(dMass);
    total += nextDMass;
    dMass = nextDMass;
  }

  return total;
}

const requiredFuel = masses
  .map(mass => calculateFuel(mass))
  .reduce((a, b) => a + b, 0);

console.log(requiredFuel);
