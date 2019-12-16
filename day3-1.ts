import {readFileSync} from 'fs';

const inputs = readFileSync('./day3-1.txt', 'utf8').split('\n');

function constructPath(input: string): [string, number][] {
  return input
    .split(',')
    .map(instruction => ([instruction[0], Number.parseInt(instruction.substr(1))]));
}

class LineSegment {
  dir: "hr" | "vr";
  start: number;
  end: number;
  offset: number;

  constructor(start: number[], end: number[]) {
    if (start[0] === end[0]) {
      this.dir = 'vr';
      this.start = Math.min(start[1], end[1]);
      this.end = Math.max(start[1], end[1]);
      this.offset = start[0];
    } else {
      this.dir = 'hr'
      this.start = Math.min(start[0], end[0]);
      this.end = Math.max(start[0], end[0]);
      this.offset = start[1]
    }
  }

  intersection(other: LineSegment) {
    if (this.dir === other.dir) {
      if (this.offset !== other.offset) {
        return Infinity;
      }

      if (!(this.end > other.start || other.end > this.start)) {
        return Infinity;
      }

      return Math.min(
        Math.abs(Math.max(this.start, other.start)),
        Math.abs(Math.max(this.end, other.end)),
      ) + Math.abs(this.offset);
    }

    if (this.dir !== other.dir) {
      if (!(this.offset > other.start && this.offset < other.end)) {
        return Infinity;
      }

      if (!(other.offset > this.start && other.offset < this.end)) {
        return Infinity;
      }

      return Math.abs(this.offset) + Math.abs(other.offset);
    }
  }
}

function getLineSegments(path: [string, number][]) {
  const pos = [0,0];
  const lines = [];

  path.forEach(([dir, distance]) => {
    const start = pos.slice();

    switch (dir) {
      case 'U':
        pos[1] += distance;
        break;
      case 'R':
        pos[0] += distance;
        break;
      case 'D':
        pos[1] -= distance;
        break;
      case 'L':
        pos[0] -= distance;
        break;
      default:
        throw new Error("not a valid move");
    }

    const end = pos.slice();

    lines.push(new LineSegment(start, end));
  });

  return lines;
}

function solve(a: LineSegment[], b: LineSegment[]) {
  let currMin = Infinity;

  a.forEach(lsA => {
    b.forEach(lsB => {
      const intersection = lsA.intersection(lsB);
      if (intersection !== 0) {
        currMin = Math.min(currMin, lsA.intersection(lsB));
      }
    })
  });

  return currMin;
}

const pathA = constructPath(inputs[0]);
const pathB = constructPath(inputs[1]);


const linesA = getLineSegments(pathA);
const linesB = getLineSegments(pathB);

console.log(solve(linesA, linesB));
