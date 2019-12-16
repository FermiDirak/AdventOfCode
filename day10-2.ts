import {readFileSync} from 'fs';

class Vector {
  x: number;
  y: number;
  theta: number;
  magnitude: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.theta = Math.atan2(y, x) + (Math.PI / 2)
    this.theta = this.theta < 0 ? this.theta + (Math.PI * 2) : this.theta

    this.magnitude = Math.sqrt(x*x + y*y);
  }

  add(other: Vector) {
    return new Vector(this.x + other.x, this.y + other.y);
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

function find200th(astroids: Vector[], center: Vector) {
  const directions = astroids
    .filter(astroid => !astroid.equivalent(center))
    .map(astroid => astroid.difference(center));

  let angleBuckets = [];

  directions.forEach(dir => {
    let seen = false;

    angleBuckets.forEach((curr, i) => {
      if (curr.isParallelWith(dir)) {
        seen = true;

        if (dir.magnitude < curr.magnitude) {
          angleBuckets[i] = dir;
        }
      }
    });

    if (!seen) {
      angleBuckets.push(dir);
    }
  });

  angleBuckets = angleBuckets.sort((a, b) => a.theta > b.theta ? 1 : -1);

  console.log(angleBuckets.map(_ => `${_.x} ${_.y}`).join('\n'))

  console.log(angleBuckets[199]);

  console.log(angleBuckets[199].add(center));

}


function sumObservableCount(astroids: Vector[], center: Vector) {
  const directions = astroids
    .filter(astroid => !astroid.equivalent(center))
    .map(astroid => astroid.difference(center));

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

  return observables.length;
}

function findMaxObservablesAstroid(astroids: Vector[]) {
  const res = astroids.map(astroid => sumObservableCount(astroids, astroid))
  const max = Math.max(...res);
  const maxIndex = res.findIndex(_ => _ === max);
  const maxAstroid = astroids[maxIndex];

  return maxAstroid;
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
  astroids.push(new Vector(j,i));
});

const maxAstroid = findMaxObservablesAstroid(astroids);
console.log(maxAstroid);

find200th(astroids, maxAstroid);
