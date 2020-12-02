import {readFileSync} from 'fs';

const inputs = readFileSync('./day12-1.txt', 'utf8').split('\n');

function parsePosition(str: string) {
  const coords = str
  .split(',')
  .map(coord => coord.replace(/[^0-9$.,-]/g, ''))
  .map(coord => Number.parseInt(coord));

  return coords;
}

function calcVelocity(positions: number[], index: number) {
  let velocity = 0;
  const currPos = positions[index];

  positions.forEach((other, i) => {
    if (i === index) {
      return;
    }

    if (currPos === other) {
      return;
    }

    velocity += currPos < other ? 1 : -1;
  });

  return velocity;
}

function add(a: number[], b: number[]) {
  const res = [];

  a.forEach((el, i) => {
    res.push(el + b[i]);
  });

  return res;
}

function isMatch(arr1: number[], arr2: number[]) {
  return arr1.every((el, i) => el === arr2[i]);
}

function isZero(arr: number[]) {
  return arr.every(cell => cell === 0);
}

function stabalizeAxis(initialPositions: number[][], axis: number) {
  const _initialAxisPositions = initialPositions.map(position => position[axis]);
  let positions = _initialAxisPositions;
  let velocities = positions.map(() => 0);

  let step = 0;

  do {
    const dVels = positions.map((_, i) => calcVelocity(positions, i));

    // console.log('step', step, '--', energy, '--', positions[0], velocities[0]);

    if (step % 1000000 === 0) {
      console.log(positions);
    }

    velocities = add(velocities, dVels);
    positions = add(positions, velocities);
    step += 1;

  } while(!isZero(velocities) || !isMatch(positions, _initialAxisPositions));

  console.log(step, 'steps to stabilize', axis);

  return step;
}


const initialPositions = inputs.map(input => parsePosition(input));

stabalizeAxis(initialPositions, 0);
stabalizeAxis(initialPositions, 1);
stabalizeAxis(initialPositions, 2);
