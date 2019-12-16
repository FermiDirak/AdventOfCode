import {readFileSync} from 'fs';

class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  difference(other: Vector) {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  equivalent(other: Vector) {
    return this.x === other.x && this.y === other.y;
  }

  isParallelWith(other: Vector) {
    const dot = this.x * other.x + this.y * other.y;

    return dot > 0 && this.x * other.y === this.y * other.x;
  }
}

function iterate2D(arr: number[][], cb: (val: number, coord: [number, number]) => void) {
  arr.forEach((row, i) => row.forEach((cell, j) => { cb(cell, [i,j]); }));
}

function sumObservableCount(astroids: Vector[], center: Vector) {
  const directions = astroids.map(astroid => astroid.difference(center));
  const observables = [];

  directions.forEach(dir => {
    let seen = false;

    observables.forEach(observable => {
      if (observable.isParallelWith(dir)) {
        seen = true;
      }
    });

    if (!seen) {
      observables.push(dir);
    }
  });

  if (observables.length - 1=== 340) {
    console.log(center);
  }

  return observables.length - 1;
}


const input = readFileSync('./day10-1.txt', 'utf8');
const map = input
  .split('\n')
  .map(row => row.split('')
  .map(cell => cell === '#' ? 1 : 0));

const astroids = [];
iterate2D(map, (cell, [i,j]) => {
  if (cell === 0) {
    return;
  }
  astroids.push(new Vector(i,j));
});

const astroidWithRes = astroids.map(astroid => [astroid, sumObservableCount(astroids, astroid)])
const max = Math.max(...astroidWithRes.map(_ => _[1]));
console.log(max);

