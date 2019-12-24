import {readFileSync} from 'fs';

function create2DMatrix<T>(
  {width, height, fill}: {width: number, height: number, fill: T}
): T[][] {
  return Array.from({length: height}).map(_ => Array.from({length: width}).map(_ => fill));
}

const BUG = 1;
const EMPTY = 0;
type Cell = typeof BUG | typeof EMPTY;

class Grid {
  // decrement to recurse inward. Increment to recurse outward
  grid: {[level: number]: Cell[][]};

  constructor(initialLevel: Cell[][]) {
    this.grid = {};

    for (let i = 0; i <= 500; ++i) {
      this.grid[i] = create2DMatrix({
        height: 5,
        width: 5,
        fill: EMPTY,
      });
    }

    this.grid[250] = initialLevel;
  }

  calcCellNextState(level: number, i: number, j: number) {

    if (this.grid[level - 1] == undefined || this.grid[level + 1] == undefined) {
      return EMPTY;
    }

    if (i === 2 && j === 2) {
      return EMPTY;
    }

    const dirs = [
      [i - 1,     j],
      [i    , j + 1],
      [i + 1,     j],
      [i    , j - 1],
    ];

    const localNeighbors = dirs.reduce((acc, [x, y]) => {
      if (x === 2 && y === 2) {
        return acc;
      }

      if (x < 0 || y < 0 || x >= 5 || y >= 5) {
        return acc;
      }

      acc.push(this.grid[level][x][y]);
      return acc;
    }, []);


    const levelNeighbors = [];

    if (i === 0) {
      levelNeighbors.push(this.grid[level + 1][1][2]);
    }
    if (i === 4) {
      levelNeighbors.push(this.grid[level + 1][3][2]);
    }

    if (j === 0) {
      levelNeighbors.push(this.grid[level + 1][2][1]);
    }
    if (j === 4) {
      levelNeighbors.push(this.grid[level + 1][2][3]);
    }

    if (i === 1 && j === 2) {
      levelNeighbors.push(
        this.grid[level - 1][0][0],
        this.grid[level - 1][0][1],
        this.grid[level - 1][0][2],
        this.grid[level - 1][0][3],
        this.grid[level - 1][0][4],
      );
    }
    if (i === 2 && j === 1) {
      levelNeighbors.push(
        this.grid[level - 1][0][0],
        this.grid[level - 1][1][0],
        this.grid[level - 1][2][0],
        this.grid[level - 1][3][0],
        this.grid[level - 1][4][0],
      );
    }
    if (i === 2 && j === 3) {
      levelNeighbors.push(
        this.grid[level - 1][0][4],
        this.grid[level - 1][1][4],
        this.grid[level - 1][2][4],
        this.grid[level - 1][3][4],
        this.grid[level - 1][4][4],
      );
    }
    if (i === 3 && j === 2) {
      levelNeighbors.push(
        this.grid[level - 1][4][0],
        this.grid[level - 1][4][1],
        this.grid[level - 1][4][2],
        this.grid[level - 1][4][3],
        this.grid[level - 1][4][4],
      );
    }

    const neighbors = [...localNeighbors, ...levelNeighbors];

    const neighborsCount = neighbors.reduce((acc, neighbor) => {
      acc += neighbor === BUG ? 1 : 0;
      return acc;
    }, 0);

    if (this.grid[level][i][j] === BUG) {
      if (neighborsCount === 1) {
        return BUG;
      }

      return EMPTY;
    }

    if (this.grid[level][i][j] === EMPTY) {
      if (neighborsCount === 1 || neighborsCount === 2) {
        return BUG;
      }

      return EMPTY;
    }

    throw new Error('cell must be bug or empty');
  }

  calcLevelNextState(level: number) {
    const newLevel = create2DMatrix({
      height: 5,
      width: 5,
      fill: EMPTY,
    });

    for (let i = 0; i < newLevel.length; ++i) {
      for (let j = 0; j < newLevel[0].length; ++j) {
        newLevel[i][j] = this.calcCellNextState(level, i, j);
      }
    }

    return newLevel;
  }

  calcGridNextState() {
    const newGrid = {};

    Object.keys(this.grid).forEach(level => {
      newGrid[Number.parseInt(level)] = this.calcLevelNextState(Number.parseInt(level));
    })

    this.grid = newGrid;
  }

  countBugs() {
    let count = 0;

    Object.values(this.grid).forEach(level => {
      for (let i = 0; i < level.length; ++i) {
        for (let j = 0; j < level[0].length; ++j) {
          count += level[i][j] === BUG ? 1 : 0;
        }
      }
    });

    return count;
  }
}

let initialLevel = readFileSync('./day24-1.txt', 'utf8')
  .split('\n')
  .map(row => row.split('').map(cell => cell === '#' ? BUG : EMPTY));

const grid = new Grid(initialLevel);

let count = 0;

while (true) {
  if (count === 200) {
    console.log(grid.countBugs())
    process.exit();
  }

  grid.calcGridNextState();
  count += 1;
}
