import {readFileSync} from 'fs';

const inputs = readFileSync('./day12-1.txt', 'utf8').split('\n');

function parsePosition(str: string) {
  const coords = str
  .split(',')
  .map(coord => coord.replace(/[^0-9$.,-]/g, ''))
  .map(coord => Number.parseInt(coord));

  return coords;
}

function calcVelocity(pos: number[], others: number[][]) {
  const velocity = [0, 0, 0];

  others.forEach(other => {
    other.forEach((axisVal, i) => {
      if (pos[i] === axisVal) {
        return;
      }

      velocity[i] += pos[i] < axisVal ? 1 : -1;
    });
  });

  return velocity;
}

function calcEnergy(positions: number[][], velocities: number[][]) {
  let totalEnergy = 0;

  for (let i = 0; i < positions.length; ++i) {
    const planetPositions = positions[i];
    const planetVelocities = velocities[i];

    const potential = planetPositions.map(pos => Math.abs(pos)).reduce((a, b) => a + b, 0);
    const kinetic = planetVelocities.map(pos => Math.abs(pos)).reduce((a, b) => a + b, 0);

    totalEnergy += potential * kinetic;
  }

  return totalEnergy;
}

function add(a: number[], b: number[]) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function run(steps: number, initialPositions: number[][]) {
  let positions = initialPositions;
  let velocities = positions.map(() => [0,0,0]);

  for (let step = 0; step <= steps; ++step) {
    const dVels = positions.map(position => calcVelocity(position, positions));
    const energy = calcEnergy(positions, velocities);

    console.log('step', step, '--', energy, '--', positions[0], velocities[0]);

    velocities = velocities.map((vel, i) => add(vel, dVels[i]));
    positions = positions.map((position, i) => add(position, velocities[i]));
  }

  console.log('finished');
}

const initialPositions = inputs.map(input => parsePosition(input));

run(1000, initialPositions);

