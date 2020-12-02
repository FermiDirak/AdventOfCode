import {readFileSync} from 'fs';


const BUG = 1;
const EMPTY = 0;
type Cell = typeof BUG | typeof EMPTY;

const dirs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function calcNextCellState(grid: Cell[][], i: number, j: number): Cell {
  const neighborsCount = dirs.reduce((acc, dir) => {
    const [x, y] = [i + dir[0], j + dir[1]];

    if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length) {
      return acc;
    }

    return acc + (grid[x][y] === BUG ? 1 : 0);
  }, 0);

  if (grid[i][j] === BUG) {
    if (neighborsCount === 1) {
      return BUG;
    }

    return EMPTY;
  } else {
    if (neighborsCount === 1 || neighborsCount === 2) {
      return BUG;
    }

    return EMPTY;
  }
}

function calcNextGrid(grid: Cell[][]): Cell[][] {
  const newGrid: Cell[][] = Array.from({length: grid.length}).map(_ => new Array({length: grid[0].length}).map(_ => EMPTY));

  for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[0].length; ++j) {
      newGrid[i][j] = calcNextCellState(grid, i, j);
    }
  }

  return newGrid;
}

function calcBioDiversityRating(grid: number[][]) {
  let rating = 0;

  for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[0].length; ++j) {
      const power = i * grid.length + j;

      rating += grid[i][j] === BUG ? 2 ** power : 0;
    }
  }

  return rating;
}

const seenGrids = new Set();

let grid = readFileSync('./day24-1.txt', 'utf8')
  .split('\n')
  .map(row => row.split('').map(cell => cell === '#' ? BUG : EMPTY));

while (true) {
  const gridRating = calcBioDiversityRating(grid)

  if (seenGrids.has(gridRating)) {
    console.log('solution: ', gridRating);
    process.exit();
  }

  seenGrids.add(gridRating);

  grid = calcNextGrid(grid);
}