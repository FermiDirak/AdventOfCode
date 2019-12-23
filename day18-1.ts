import {readFileSync} from 'fs';

const input = readFileSync('./day18-1.txt', 'utf8');

function createMaze(input: string) {
  return input.split('\n').map(line => line.split(''));
}

function findAtSymbolPos(maze: string[][]) {
  let pos = [-1, -1];

  maze.forEach((row, i) => row.forEach((cell, j) => {
    if (cell === '@') {
      pos = [i, j];
    }
  }));

  return pos;
}

function create2DMatrix({width, height, fill}: {width: number, height: number, fill: number}) {
  return Array.from({length: height}).map(_ => Array.from({length: width}).map(_ => fill));
}

type MazeData = {
  // distances from key to key (and @)
  distances: number[][],
  // blockers between @ and key
  blockers: {[key: string]: string[]},
}

function generateMazeData(maze: string[][]): MazeData {
  let distances = create2DMatrix({
    width: 27,
    height: 27,
    fill: Infinity,
  });

  let blockers = 'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .reduce((acc, curr) => {
      acc[curr] = [];
      return acc;
    }, {});

    //keeps track of distance from
    const cache = create2DMatrix({
      width: maze[0].length,
      height: maze.length,
      fill: Infinity,
    });

    const initialPos = findAtSymbolPos(maze);


    function dfs(initialPos) {

    }

  return {distances, blockers}
}

const maze = createMaze(input);
const mazeData = generateMazeData(maze);

// console.log(mazeData);
