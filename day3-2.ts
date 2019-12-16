import {readFileSync} from 'fs';

const inputs = readFileSync('./day3-1.txt', 'utf8').split('\n');

function constructPath(input: string): [string, number][] {
  return input
    .split(',')
    .map(instruction => ([instruction[0], Number.parseInt(instruction.substr(1))]));
}

function stringifyPos(pos: number[]) {
  return `${pos[0]},${pos[1]}`;
}

function iteratePath(path: [string, number][], cb: (pos: number[]) => void) {
  let pos = [0, 0];

  path.forEach(([dir, distance]) => {
    for (let i = 0; i < distance; ++i) {
      switch (dir) {
        case 'U':
          pos[1] += 1;
          break;
        case 'R':
          pos[0] += 1;
          break;
        case 'D':
          pos[1] -= 1;
          break;
        case 'L':
          pos[0] -= 1;
          break;
        default:
          throw new Error('RIP');
      }

      cb(pos);
    }
  });
}

function trace(path: [string, number][]) {
  const positions = {};
  const pos = [0, 0];
  let counter = 0;

  iteratePath(path, (pos) => {
    counter += 1;
    positions[stringifyPos(pos)] = counter;
  });

  return positions;
}

function solve(positions: {[pos: string]: number}, path: [string, number][]) {
  let res = Infinity;
  let counter = 0;

  iteratePath(path, (pos) => {
    counter += 1;

    if (positions[stringifyPos(pos)]) {
      res = Math.min(res, counter + positions[stringifyPos(pos)]);
    }
  });

  return res;
}

const pathA = constructPath(inputs[0]);
const pathB = constructPath(inputs[1]);


const positions = trace(pathA);
console.log(solve(positions, pathB));